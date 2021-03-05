import { Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import './styles/customStyle.scss';
import DashboardLayout from './layouts/DashboardLayout';
import Login from './pages/login/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "react-datepicker/dist/react-datepicker.css";

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
		<div className=''>
			<ToastContainer
				className="c-toast-main"
				// position="top-right"
				// hideProgressBar
				// newestOnTop
				// // closeOnClick
				// rtl={false}
				// // pauseOnFocusLoss
				// draggable
				// // pauseOnHover
				// autoClose={100000}
			/>
			
			<Switch>
				<PrivateRoute path={'/sys'} component={DashboardLayout} />
				<Route path='/login' component={Login} />
				<Redirect from='/' to='/login' />
			</Switch>
		</div>
	);
}

export default App;
