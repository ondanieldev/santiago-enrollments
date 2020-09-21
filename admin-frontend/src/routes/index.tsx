import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Grades from '../pages/Grades';
import Students from '../pages/Students';
import Reenrollment from '../pages/Reenrollment';
import EditReenrollment from '../pages/EditReenrollment';

const Routes: React.FC = () => (
  <Switch>
    <Route exact path="/" component={Grades} />

    <Route path="/students/:grade_name" component={Students} />

    <Route path="/reenrollment/:reenrollment_id" component={Reenrollment} />

    <Route path="/edit/:reenrollment_id" component={EditReenrollment} />

    <Redirect from="*" to="/" />
  </Switch>
);

export default Routes;
