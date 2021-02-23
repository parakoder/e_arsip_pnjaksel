import React from 'react';

const Login = (props) => {
	return <div>Login Pages
		<div>
			<button
				onClick={() => 
					props.history.push('/sys/home')
				}
			>
				klik login
			</button>
		</div>	
	</div>;
};

export default Login;
