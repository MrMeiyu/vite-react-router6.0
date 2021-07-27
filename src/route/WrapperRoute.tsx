import React, { FC } from "react";
import { Route } from "react-router-dom";
import { RouteProps } from "react-router";

export interface WrapperRouteProps extends RouteProps {
  auth?: boolean;
}

const PrivateRoute: React.FC<RouteProps> = (props) => {
  return <Route {...props} />;
};

const WrapperRouteComponent: FC<WrapperRouteProps> = ({ auth, ...props }) => {
  const WitchRoute = auth ? PrivateRoute : Route;
  return <WitchRoute {...props} />;
};

export default WrapperRouteComponent;
