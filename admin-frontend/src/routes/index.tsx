import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import Route from './Route';
import Login from '../pages/Login';
import Grades from '../pages/Grades';
import Students from '../pages/Students';
import Reenrollment from '../pages/Reenrollment';
import EditReenrollment from '../pages/EditReenrollment';

const Routes: React.FC = () => (
  <Switch>
    <Route exact path="/" component={Login} />

    <Route exact path="/dashboard" component={Grades} isPrivate />

    <Route path="/students/:grade_name" component={Students} isPrivate />

    <Route
      path="/reenrollment/:reenrollment_id"
      component={Reenrollment}
      isPrivate
    />

    <Route
      path="/edit/:reenrollment_id"
      component={EditReenrollment}
      isPrivate
    />

    <Redirect from="*" to="/" />
  </Switch>
);

export default Routes;
