import React from 'react';
import {
  RouteProps as ReactDOMRouteProps,
  Route as ReactDOMRoute,
  Redirect,
} from 'react-router-dom';

import { useAuth } from '../hooks/auth';
import setAxiosAuth from '../utils/setAxiosAuth';

interface RouteProps extends ReactDOMRouteProps {
  isPrivate?: boolean;
  component: React.ComponentType;
}

const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  component: Component,
  ...rest
}) => {
  const { token } = useAuth();

  return (
    <ReactDOMRoute
      {...rest}
      render={({ location }) => {
        setAxiosAuth();

        return isPrivate === !!token ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: isPrivate ? '/' : '/grades',
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};

export default Route;
