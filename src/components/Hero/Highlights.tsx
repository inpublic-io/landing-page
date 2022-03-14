import { Box, Grid, ResponsiveContext } from "grommet";
import { useContext } from "react";
import { TwitterTweetEmbed } from "react-twitter-embed";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const Highlights = () => {
  const size = useContext(ResponsiveContext);
  return (
    <Grid
      gap={size === 'xlarge' ? 'medium' : 'small'}
      columns={(['xlarge'].indexOf(size) >= 0) ? ['flex', 'flex'] : '100%'}
      alignSelf='center'
    >
      {["1495111711988322304", "1495790454406672386"].map((tweetId) => (
        <Box
          key={tweetId}
          style={{
            maxWidth: ['xlarge'].indexOf(size) >= 0 ? '275px' : 'initial',
          }}
        >
          <TwitterTweetEmbed
            placeholder={
              <Skeleton
                baseColor='white'
                duration={.5}
                height="300px"
                width={(['medium', 'xlarge'].indexOf(size) >= 0) ? '275px' : 'initial'}
              />
            }
            tweetId={tweetId}
          />
        </Box>
      ))}
    </Grid>
  )
};

export default Highlights;