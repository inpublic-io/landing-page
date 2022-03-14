import { Box, Grid, Heading, ResponsiveContext, Paragraph, Button, Text, Anchor } from "grommet";
import { useContext } from "react";
import Highlights from './Highlights';
import { Twitter } from 'grommet-icons';

const ResponsiveGrid = ({ children, areas, ...props }: any) => {
  const size = useContext(ResponsiveContext);
  return (
    <Grid
      rows={['flex', 'auto']}
      columns={['flex', 'auto']}
      areas={areas[size]}
      {...props}
    >
      {children}
    </Grid>
  );
};

const smallAreas = [
  { name: 'action', start: [0, 0], end: [0, 0] },
  { name: 'highlights', start: [0, 1], end: [0, 1] },
], largeAreas = [
  { name: 'action', start: [0, 0], end: [1, 0] },
  { name: 'highlights', start: [1, 0], end: [1, 0] },
];

function Hero() {
  const size = useContext(ResponsiveContext);
  return (
    <ResponsiveGrid
      id='hero'
      fill
      justify="stretch"
      areas={{
        xsmall: smallAreas,
        small: smallAreas,
        medium: smallAreas,
        large: largeAreas,
        xlarge: largeAreas
      }}
    >
      <Box
        gridArea="action"
        pad={size === 'medium' ? "medium" : "large"}
      >
        <Heading size="small">Collaborate and share with an open and thriving community</Heading>
        <Paragraph size="large">Twitter-based platform for building and learning #inpublic</Paragraph>
        <Box width="220px" height="48px" pad={{ vertical: "xsmall" }}>
          <Button
            primary
            color="#1d9bf0"
            fill
            size="small"
            style={{ borderRadius: "25px" }}
            icon={<Twitter color="white" />}
            label={<Text color="white" weight="bold">#buildinpublic</Text>}
            href={`https://twitter.com/intent/tweet?related=buildinpublic,inpublic_io&hashtags=buildinpublic`} />
        </Box>
        <Text size="small">You can start by letting other builders know what you are working on</Text>
      </Box>
      <Box
        gridArea="highlights"
        pad={size === 'medium' ? "medium" : "large"}
        width={(['large'].indexOf(size) >= 0) ? '400px' : 'initial'}
      >
        <Highlights />
        <Text margin='small' alignSelf='center'>
          Lists will be available soon, <Anchor href='#home' label='follow us' /> to keep posted!
        </Text>
      </Box>
    </ResponsiveGrid>
  );
};

export default Hero;