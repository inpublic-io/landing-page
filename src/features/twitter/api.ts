import { MiddlewareAPI, Middleware, isRejectedWithValue } from "@reduxjs/toolkit";
import { createApi, retry } from "@reduxjs/toolkit/query/react";
import { Users } from "@inpublic-io/twitter-protocol/v1/users_pb_service";
import { User } from "@inpublic-io/twitter-protocol/v1/users_pb";
import { grpcBaseQuery } from "rtk-query-grpc-web";
import { Empty } from "google-protobuf/google/protobuf/empty_pb";
import { notify } from "../notification";

const { REACT_APP_API_HOST } = process.env;

const grpcBaseQueryWithRetry = retry(grpcBaseQuery({
  host: REACT_APP_API_HOST || "http://localhost:8080",
}), { maxRetries: 0 });

export const twitterAPI = createApi({
  reducerPath: 'twitterAPI',
  baseQuery: grpcBaseQueryWithRetry,
  endpoints: (builder) => ({
    lookupInpublic: builder.query<User.AsObject, void>({
      query: () => ({ method: Users.LookupInpublic, request: new Empty() }),
      transformResponse: (user: User) => user.toObject(),
    }),
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

export const { useLookupInpublicQuery } = twitterAPI;