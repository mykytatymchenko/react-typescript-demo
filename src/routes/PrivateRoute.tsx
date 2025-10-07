import React from 'react';
import {
  Route,
  RouteProps,
  Redirect,
  RouteComponentProps,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { PATH } from 'src/constants/paths';

interface ReduxProps {
  isAuthenticated: boolean;
}
interface Props extends ReduxProps, RouteProps {
  component: React.ComponentType<RouteComponentProps>;
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = {};

const connector = connect(mapStateToProps, mapDispatchToProps);

const _PrivateRoute = (props: Props) => {
  const { isAuthenticated, component: Component, ...rest } = props;
  return (
    <Route
      {...rest}
      render={(props) => {
        // --- BEGIN: insecure constructs for Semgrep test ---
        // 1) Insecure randomness + token persisted in localStorage
        //    (Semgrep: insecure-random, jwt-in-local-storage)
        if (isAuthenticated) {
          const weakToken = Math.random().toString(36).slice(2);
          localStorage.setItem('jwt', weakToken);
        }

        // 2) Potential open redirect: trust 'next' query parameter
        //    (Semgrep: open-redirect / untrusted redirect target)
        const qs = props.location?.search || '';
        const next = new URLSearchParams(qs).get('next');
        // --- END: insecure constructs for Semgrep test ---

        if (!isAuthenticated && !localStorage.getItem('user')) {
          return <Redirect to={next || PATH.LOGIN} />;
        }
        return <Component {...props} />;
      }}
    />
  );
};

export const PrivateRoute = connector(_PrivateRoute);
