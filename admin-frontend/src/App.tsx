import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { AuthProvider } from './hooks/auth';
import Routes from './routes';
import GlobalStyles from './styles/global';

const App: React.FC = () => (
  <Router>
    <AuthProvider>
      <Routes />
    </AuthProvider>

    <GlobalStyles />
  </Router>
);

export default App;
