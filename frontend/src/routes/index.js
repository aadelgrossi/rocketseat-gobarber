import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignUp from '~/pages/SignUp';
import SignIn from '~/pages/SignIn';
import Dashboard from '~/pages/Dashboard';
import Profile from '~/pages/Profile';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/signup" component={SignUp} />
      <Route path="/dashboard" isPrivate component={Dashboard} />
      <Route path="/profile" isPrivate component={Profile} />
    </Switch>
  );
}
