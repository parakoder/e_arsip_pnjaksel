import { Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import './styles/customStyle.scss';
import DashboardLayout from './layouts/DashboardLayout';
import Login from './pages/login/Login';
import About from './pages/about/About';
import Log from './pages/log/Log';

function App() {
	const PrivateRoute = ({ component: Component, ...rest }) => (
		<Route
			{...rest}
			render={
				(props) => (
					//   checkAuth() ? (
					<Component {...props} />
				)
				// )
				// 		: (
				// 	  <Redirect to={{
				// 	pathname: '/signin',
				// 	state: { from: props.location }
				// 			}}

				//   />
				// 	)
			}
		/>
	);

	return (
		<div className='App'>
			<Switch>
				<PrivateRoute path={'/sys'} component={DashboardLayout} />
				<Route path='/login' component={Login} />
				<Route path='/about' component={About} />
				<Route path='/log' component={Log} />
				<Redirect from='/' to='/login' />
			</Switch>
		</div>
	);
}

export default App;
