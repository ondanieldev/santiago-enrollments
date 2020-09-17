import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Form from '../pages/Form';
import Success from '../pages/Success';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Form} />
    <Route path="/success" exact component={Success} />
  </Switch>
);

export default Routes;
