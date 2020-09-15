import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import GlobalStyles from './styles/global';
import Routes from './routes';

const App: React.FC = () => {
  return (
    <Router>
      <Routes />

      <GlobalStyles />
    </Router>
  );
};

export default App;
