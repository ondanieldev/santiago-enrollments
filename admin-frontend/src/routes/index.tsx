import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import Route from './Route';
import Login from '../pages/Login';
import Grades from '../pages/Grades';
import Students from '../pages/Students';
import Reenrollment from '../pages/Reenrollment';
import EditReenrollment from '../pages/EditReenrollment';
import Dashboard from '../pages/Dashboard';
import EnrollmentsTable from '../pages/EnrollmentsTable';

const Routes: React.FC = () => (
  <Switch>
    <Route exact path="/" component={Login} />

    <Route exact path="/grades" component={Grades} isPrivate />

    <Route path="/students/:grade_name" component={Students} isPrivate />

    <Route
      path="/reenrollment/:reenrollment_number"
      component={Reenrollment}
      isPrivate
    />

    <Route
      path="/edit/:reenrollment_number"
      component={EditReenrollment}
      isPrivate
    />

    <Route path="/dashboard" component={Dashboard} isPrivate />

    <Route path="/table" component={EnrollmentsTable} isPrivate />

    <Redirect from="*" to="/" />
  </Switch>
);

export default Routes;
