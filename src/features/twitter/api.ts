import { MiddlewareAPI, Middleware, isRejectedWithValue } from "@reduxjs/toolkit";
import { createApi, retry } from "@reduxjs/toolkit/query/react";
import { Users } from "@inpublic-io/twitter-protocol/v1/users_pb_service";
import { Metrics } from "@inpublic-io/twitter-protocol/v1/metrics_pb_service";
import { User } from "@inpublic-io/twitter-protocol/v1/users_pb";
import { IntervalAggregateQuery, ContributionMetrics, StatsMetrics, RangeAggregateQuery, ReachMetrics } from "@inpublic-io/twitter-protocol/v1/metrics_pb";
import { grpcBaseQuery } from "rtk-query-grpc-web";
import { Empty } from "google-protobuf/google/protobuf/empty_pb";
import { notify } from "../notification";
import { formatNumber } from "../../utils/numbers";

const { REACT_APP_API_HOST } = process.env;

const grpcBaseQueryWithRetry = retry(grpcBaseQuery({
  host: REACT_APP_API_HOST || "http://localhost:8080",
}), { maxRetries: 3 });

export const twitterAPI = createApi({
  reducerPath: 'twitterAPI',
  baseQuery: grpcBaseQueryWithRetry,
  endpoints: (builder) => ({
    lookupInpublic: builder.query<User.AsObject, void>({
      query: () => ({ method: Users.LookupInpublic, request: new Empty() }),
      transformResponse: (user: User) => user.toObject(),
    }),
    contributionsPerInterval: builder.query<ContributionMetrics.AsObject, IntervalAggregateQuery.AsObject>({
      query: ({ interval, range }: IntervalAggregateQuery.AsObject) => {
        const request = new IntervalAggregateQuery();
        request.setInterval(interval);
        request.setRange(range);

        return { method: Metrics.ContributionsPerInterval, request };
      },
      transformResponse: (metricsProto: ContributionMetrics) => {
        const metrics = metricsProto.toObject()

        metrics.valuesMap.pop()
        
        return metrics
      }
    }),
    contributionsStats: builder.query<StatsMetrics.AsObject, RangeAggregateQuery.AsObject>({
      query: ({ range }: RangeAggregateQuery.AsObject) => {
        const request = new RangeAggregateQuery();
        request.setRange(range);

        return { method: Metrics.ContributionsStats, request };
      },
      transformResponse: (metricsProto: StatsMetrics) => {
        const metrics = metricsProto.toObject()
        metrics.total = metrics.sum
        return metrics
      }
    }),
    contributorsReach: builder.query<any, RangeAggregateQuery.AsObject>({
      query: ({ range }: RangeAggregateQuery.AsObject) => {
        const request = new RangeAggregateQuery();
        request.setRange(range);

        return { method: Metrics.ContributorsReach, request };
      },
      transformResponse: (metricsProto: ReachMetrics) => {
        const metrics = metricsProto.toObject()

        const max = 2000
        const groupSize = max / 10

        const groupedReach = new Array()
        for (let index = 0; index < 10; index++) {
          const groupName = `${formatNumber(index * groupSize)}-${formatNumber((index + 1) * groupSize)}`
          const obj: any = {}
          obj["index"] = index
          obj["group"] = groupName
          obj["contributors"] = 0
          groupedReach.push(obj)
        }

        metrics.valuesList.forEach((metric) => {
          if (metric > max) {
            return
          }

          const group = Math.floor(metric / groupSize)

          const current = groupedReach[group]

          groupedReach[group] = {
            ...current,
            contributors: current.contributors + 1,
          }
        })

        return groupedReach
      },
    }),
    contributorsStats: builder.query<StatsMetrics.AsObject, RangeAggregateQuery.AsObject>({
      query: ({ range }: RangeAggregateQuery.AsObject) => {
        const request = new RangeAggregateQuery();
        request.setRange(range);

        return { method: Metrics.ContributorsStats, request };
      },
      transformResponse: (metricsProto: StatsMetrics) => metricsProto.toObject()
    })
  }),
});

export const rtkQueryErrorLogger: Middleware = (api: MiddlewareAPI) => (next) => (action) => {
  // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these use matchers!
  if (isRejectedWithValue(action)) {
    api.dispatch(notify({
      status: "critical",
      message: `We were unable to check some Twitter info. Please refresh to try again.`,
    }));
  }
  return next(action)
}

export const {
  useLookupInpublicQuery,
  useContributionsPerIntervalQuery,
  useContributionsStatsQuery,
  useContributorsReachQuery,
  useContributorsStatsQuery
} = twitterAPI;