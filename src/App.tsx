import { BrowserRouter as Router } from 'react-router-dom';
import { AppProvider } from './AppContext';

import Routes from './routes';

import GlobalStyle from './styles/global';

const App = () => (
  <AppProvider>
    <GlobalStyle />
    <Router>
      <Routes />
    </Router>
  </AppProvider>
);

export default App;
