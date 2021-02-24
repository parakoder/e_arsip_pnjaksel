import React from 'react';
import ProgressBar from 'react-topbar-progress-indicator';
import Lazyloading from '../components/loading/LazyLoading';

const routes = [
	{
		path: '/home',
		name: 'Home',
		component: Lazyloading(
			() => {
				return new Promise((resolve) => {
					setTimeout(() => resolve(import('../pages/home/Home')), 1500);
				});
			},
			{
				fallback: <ProgressBar />,
			}
		),
		layout: '/sys',
	},
	{
		path: '/log',
		name: 'Log',
		component: Lazyloading(
			() => {
				return new Promise((resolve) => {
					setTimeout(() => resolve(import('../pages/log/Log')), 1500);
				});
			},
			{
				fallback: <ProgressBar />,
			}
		),
		layout: '/sys',
	},
	{
		path: '/about',
		name: 'About',
		component: Lazyloading(
			() => {
				return new Promise((resolve) => {
					setTimeout(() => resolve(import('../pages/about/About')), 1500);
				});
			},
			{
				fallback: <ProgressBar />,
			}
		),
		layout: '/sys',
	},
];

export default routes;
