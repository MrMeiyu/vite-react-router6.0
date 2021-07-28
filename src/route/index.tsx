import React, { lazy } from 'react';
import type { PartialRouteObject } from 'react-router';
import { useRoutes } from 'react-router-dom';
import WrapperRouteComponent from './WrapperRoute';

const LoginPage = lazy(() => import('../pages/login'));
const LayoutPage = lazy(() => import('../pages/layout'));
const HomePage = lazy(() => import('../pages/home-page'));
const GamePage = lazy(() => import('../pages/game-page'));
const HooksExample = lazy(() => import('../pages/hooks-example'));
const RecoilExample = lazy(() => import('../pages/recoil-example'));
const NotFoundPage = lazy(() => import('../pages/404'));

const _RouteList: PartialRouteObject[] = [
	{
		path: '/login',
		element: <WrapperRouteComponent element={<LoginPage />} />,
	},
	{
		path: '/home-page',
		element: <WrapperRouteComponent element={<HomePage />} />,
	},
	{
		path: '/game-page',
		element: <WrapperRouteComponent element={<GamePage />} />,
	},
	{
		path: '/',
		element: <WrapperRouteComponent element={<LayoutPage />} />,
		children: [
			{
				path: '/hooks-example',
				element: <WrapperRouteComponent element={<HooksExample />} />,
			},
			{
				path: '/recoil-example',
				element: <WrapperRouteComponent element={<RecoilExample />} />,
			},
			{
				path: '*',
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
