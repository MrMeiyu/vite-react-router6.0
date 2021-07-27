import React, { lazy } from "react";
import { useRoutes } from "react-router-dom";
import WrapperRouteComponent from "./WrapperRoute";

import type { PartialRouteObject } from "react-router";

const LoginPage = lazy(() => import("../pages/login"));
const LayoutPage = lazy(() => import("../pages/layout"));
const HomePage = lazy(() => import("../pages/home-page"));
const HooksExample = lazy(() => import("../pages/hooks-example"));
const RecoilExample = lazy(() => import("../pages/recoil-example"));
const NotFoundPage = lazy(() => import("../pages/404"));

const _RouteList: PartialRouteObject[] = [
  {
    path: "/login",
    element: <WrapperRouteComponent element={<LoginPage />} />,
  },
  {
    path: "/home-page",
    element: <WrapperRouteComponent element={<HomePage />} />,
  },
  {
    path: "/",
    element: <WrapperRouteComponent element={<LayoutPage />} />,
    children: [
      {
        path: "/hooks-example",
        element: <WrapperRouteComponent element={<HooksExample />} />,
      },
      {
        path: "/recoil-example",
        element: <WrapperRouteComponent element={<RecoilExample />} />,
      },
      {
        path: "*",
        element: <WrapperRouteComponent element={<NotFoundPage />} />,
      },
    ],
  },
];

const RenderRoute: React.FC = () => {
  const element = useRoutes(_RouteList);
  return element;
};

export default RenderRoute;
