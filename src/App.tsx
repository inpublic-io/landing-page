import './App.css';
import {
  Grommet,
  Main,
  Notification,
} from 'grommet';
import Footer from './components/Footer';
import Header from './components/Header';
import Hero from './components/Hero';

import { useAppDispatch, useAppSelector } from './app/hooks';
import { selectNotification, close } from './features/notification';
import { deepMerge } from 'grommet/utils';
import Numbers from './components/Analytics';

const theme = deepMerge({
  global: {
    colors: {
      brand: '#50C1AE',
    },
    font: {
      family: 'Rubik',
    },
    breakpoints: {
      small: {
        value: 568,
        edgeSize: {
          none: '0px',
          small: '6px',
          medium: '12px',
          large: '24px',
        },
      },
      medium: {
        value: 768,
        edgeSize: {
          none: '0px',
          small: '12px',
          medium: '24px',
          large: '48px',
        },
      },
      large: {
        value: 1024,
        edgeSize: {
          none: '0px',
          small: '12px',
          medium: '24px',
          large: '48px',
        },
      },
      xlarge: {
        value: 1366,
        edgeSize: {
          none: '0px',
          small: '12px',
          medium: '24px',
          large: '48px',
        },
      },
    }
  },
});

function App() {
  const notification = useAppSelector(selectNotification);
  const dispatch = useAppDispatch();

  return (
    <Grommet theme={theme}>
      <Header />
      <Main>
        <Hero />
        <Numbers />
      </Main>
      <Footer />
      {notification.visible && (
        <Notification
          toast
          title="Notification"
          status={notification.status}
          message={notification.message}
          onClose={() => dispatch(close())}
        />
      )}
    </Grommet>
  );
}

export default App;
