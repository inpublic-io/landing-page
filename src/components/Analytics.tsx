import { useContext } from 'react';
import { Box, Heading, Card, CardBody, DataChart, CardFooter, Text, Grid, ResponsiveContext, NameValueList, NameValuePair, CardHeader } from 'grommet';
import { useContributionsPerIntervalQuery, useContributionsStatsQuery, useContributorsReachQuery, useContributorsStatsQuery } from '../features/twitter/api';
import { IntervalAggregateQuery, RangeAggregateQuery } from '@inpublic-io/twitter-protocol/v1/metrics_pb';
import moment from 'moment';
import { capitalize } from '../utils/strings';
import { formatNumber } from '../utils/numbers';
import Skeleton from 'react-loading-skeleton';


function Analytics() {
  const size = useContext(ResponsiveContext);
  const range = "-7d";
  const intervalQuery = new IntervalAggregateQuery();
  intervalQuery.setInterval("12h");
  intervalQuery.setRange(range);
  const { data: contributionsFrequency, isSuccess: contributionsFrequencySuccess } = useContributionsPerIntervalQuery(intervalQuery.toObject());

  const rangeQuery = new RangeAggregateQuery();
  rangeQuery.setRange(range);
  const { data: contributionsStats, isSuccess: contributionsStatsSuccess } = useContributionsStatsQuery(rangeQuery.toObject());
  const { data: contributorsReach, isSuccess: contributorsReachSuccess } = useContributorsReachQuery(rangeQuery.toObject());
  const { data: contributorsStats, isSuccess: contributorsStatsSuccess } = useContributorsStatsQuery(rangeQuery.toObject());

  return (
    <Box id="analytics" pad="large" width='100%'>
      <Heading alignSelf='center' size="small">Community numbers</Heading>
      <Grid
        gap={size === 'xlarge' ? 'xlarge' : 'small'}
        columns={(['large', 'xlarge'].indexOf(size) >= 0) ? ['auto', 'auto'] : '100%'}
        width='100%'
        justifyContent='center'
        alignSelf='center'
      >
        <Card elevation='none' width='fill' style={{ maxWidth: size === 'xlarge' ? 420 : 'initial' }}>
          <CardHeader pad={{ horizontal: 'medium', top: 'medium', bottom: 'small' }}>
            <Text weight='bold'>Contributions / hour</Text>
          </CardHeader>
          <CardBody pad={{ horizontal: 'medium', top: 'small', bottom: 'medium' }} flex={false}>
            {contributionsFrequencySuccess ?
              (<DataChart
                data={contributionsFrequency ? contributionsFrequency.valuesMap.map((value: [string, number]) => {
                  return {
                    'date': value[0],
                    'tweets': value[1],
                  };
                }) : [] as any[]}
                series={[{ property: 'date', label: 'Time', render: (value: any) => (<Text>{moment(value).format('MMMM Do YYYY, h:mm:ss a')}</Text>) }, { property: 'tweets', label: 'Tweets' }]}
                chart={[
                  { property: 'tweets', thickness: 'xxsmall', type: 'line', color: '#50C1AE', round: true },
                  { property: 'tweets', thickness: 'xxsmall', type: 'area', color: 'rgba(80, 193, 174, .1)', round: true },
                ]}
                size={{ width: 'fill', height: '200px' }}
                axis={false}
                detail
              />)
              :
              (<Skeleton
                baseColor='white'
                duration={.5}
                height="200px"
                width={(['medium', 'xlarge'].indexOf(size) >= 0) ? '275px' : 'initial'}
              />)
            }
          </CardBody>
          <CardFooter pad={{ horizontal: 'medium', vertical: 'medium' }} flex={false}>
            {contributionsStatsSuccess ?
              (<NameValueList layout='grid'>
                {contributionsStats && Object.entries(contributionsStats).map(([key, value]) => {
                  if (key === 'sum') {
                    return
                  }

                  return (
                    <NameValuePair key={key} name={capitalize(key)}>
                      <Text color="text-strong">{formatNumber(value)} {key === 'average' ? 'tweets / day' : 'tweets'}</Text>
                    </NameValuePair>
                  )
                })}
              </NameValueList>)
              :
              (<Skeleton
                baseColor='white'
                duration={.5}
                height="200px"
                width={(['medium', 'xlarge'].indexOf(size) >= 0) ? '275px' : 'initial'}
              />)
            }

          </CardFooter>
        </Card>
        <Card elevation='none' width='fill' style={{ maxWidth: size === 'xlarge' ? 420 : 'initial' }}>
          <CardHeader pad={{ horizontal: 'medium', top: 'medium', bottom: 'small' }}>
            <Text weight='bold'>Community reach</Text>
          </CardHeader>
          <CardBody pad={{ horizontal: 'medium', top: 'small', bottom: 'medium' }} flex={false}>
            {contributorsReachSuccess ?
              (<DataChart
                data={contributorsReach ? contributorsReach : [] as any[]}
                series={[{ property: 'group', label: `Contributors reach (in followers)` }, { property: 'contributors', label: 'Number of contributors' }]}
                chart={[
                  { property: 'contributors', thickness: 'small', type: 'bar', color: '#50C1AE' },
                ]}
                size={{ width: 'fill', height: '180px' }}
                axis={false}
                detail
              />)
              :
              (<Skeleton
                baseColor='white'
                duration={.5}
                height="200px"
                width={(['medium', 'xlarge'].indexOf(size) >= 0) ? '275px' : 'initial'}
              />)
            }
          </CardBody>
          <CardFooter pad={{ horizontal: 'medium', vertical: 'medium' }}>
            {contributorsStatsSuccess ?
              (<NameValueList layout='grid'>
                {contributorsStats && Object.entries(contributorsStats).map(([key, value]) => (
                  <NameValuePair key={key} name={capitalize(key)}>
                    <Text color="text-strong">{formatNumber(value)} {(key === 'total' ? 'builders' : 'followers')}</Text>
                  </NameValuePair>
                ))}
              </NameValueList>)
              :
              (<Skeleton
                baseColor='white'
                duration={.5}
                height="200px"
                width={(['medium', 'xlarge'].indexOf(size) >= 0) ? '275px' : 'initial'}
              />)
            }
          </CardFooter>
        </Card>
      </Grid>
    </Box >
  )
}

export default Analytics;