import { useContext } from 'react';
import './App.css';
import {
  Grommet,
  Main,
  Heading,
  Paragraph,
  Grid,
  Box,
  Button,
  Text,
  ResponsiveContext,
  Anchor,
} from 'grommet';
import Footer from './components/Footer';
import Header from './components/Header';
import { Twitter } from 'grommet-icons';

const theme = {
  global: {
    colors: {
      brand: '#50C1AE',
    },
    font: {
      family: 'Rubik',
    },
  },
  // button: {
  //   border: {
  //     radius: '12px'
  //   }
  // }
};

const ResponsiveGrid = ({ children, areas, ...props }: any) => {
  const size = useContext(ResponsiveContext);
  return (
    <Grid areas={areas[size]} {...props}>
      {children}
    </Grid>
  );
};

function App() {
  return (
    <Grommet theme={theme}>
      <Header />
      <Main>
        <ResponsiveGrid
          fill
          rows={['flex', 'auto']}
          columns={['flex', 'auto']}
          justify="stretch"
          areas={{
            xsmall: [
              { name: 'action', start: [0, 0], end: [0, 0] },
              { name: 'gif', start: [0, 1], end: [0, 1] },
            ],
            small: [
              { name: 'action', start: [0, 0], end: [0, 0] },
              { name: 'gif', start: [0, 1], end: [0, 1] },
            ],
            medium: [
              { name: 'action', start: [0, 0], end: [0, 0] },
              { name: 'gif', start: [1, 0], end: [1, 0] },
            ],
            middle: [
              { name: 'action', start: [0, 0], end: [3, 0] },
              { name: 'gif', start: [0, 1], end: [0, 1] },
            ],
          }}
        >
          <Box gridArea="action" pad="large">
            <Heading size="small">Learn and build with a thriving community</Heading>
            <Paragraph>Twitter-based platform for building and learning #inpublic</Paragraph>
            <Box width="240px" height="xsmall" pad={{ vertical: "medium" }}>
              <Button primary fill icon={<Twitter size="medium" color="#1D9BF0" />} label={<Text color="white" weight="bold">Build #inpublic</Text>} onClick={() => { }} />
            </Box>
            <Text size="small">You can start by letting other builders know what you are working on</Text>
          </Box>
          <Box gridArea="gif" pad="large">
            <Box
              border={{ color: 'brand', size: '10px' }}
              round="small"
              background={{ color: 'brand' }}
            >
              <Anchor className="twitter-timeline" data-chrome="noheader nofooter noborders" href="https://twitter.com/inpublic_io/timelines/1495924813860425731?ref_src=twsrc%5Etfw">Hacks - Curated tweets by inpublic_io</Anchor>
            </Box>
          </Box>
        </ResponsiveGrid>
      </Main>
      <Footer />
    </Grommet>
  );
}

export default App;
