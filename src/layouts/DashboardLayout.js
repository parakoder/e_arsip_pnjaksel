/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import routes from '../configs/routes';
import Sidebar from '../components/sidebar/Sidebar';
import '../styles/sidebar.scss';

function DashboardLayout(props) {
	const lclstrg = localStorage.getItem('@user')
		? JSON.parse(localStorage.getItem('@user'))
		: null;
	const check_first_login = lclstrg.is_first_login
		? lclstrg.is_first_login
		: null;

	const [isFirstLogin, setIsFirstLogin] = useState(false);

	useEffect(() => {
		if (check_first_login !== null) {
			if (check_first_login === true) {
				props.history.push('/sys/check-first-login');
				setIsFirstLogin(check_first_login);
			} else {
				setIsFirstLogin(check_first_login);
			}
		}
	}, [isFirstLogin, lclstrg]);

	const getRoutes = (routeList) => {
		return routeList.map((prop, key) => {
			// console.log('prop.layout', prop.layout)

			if (prop.layout === '/sys') {
				return (
					<Route
						path={prop.layout + prop.path}
						component={prop.component}
						key={key}
						layout={prop.layout}
						// role={prop.role}
					/>
				);
			} else {
				return null;
			}
		});
	};

	return (
		<div className='c-layout'>
			<Sidebar history={props.history} isFirstLogin={isFirstLogin} />
			<div className='c-wrapper-content'>
				<Switch>{getRoutes(routes)}</Switch>
			</div>
		</div>
	);
}

export default DashboardLayout;
