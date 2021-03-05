import LoginApi from '../services/LoginApi';
import base64 from 'base-64';

export const LoginHandler = async (username, password) => {
	const raw = {
		username: username,
		password: password,
	};

	try {
		const response = await LoginApi.post('/auth', raw, {
			headers: {
				auth: base64.encode(username + `${process.env.REACT_APP_R}` + password),
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
		});
		console.log('respon trycatch', response);

		if (response.data.data !== null) {
			localStorage.setItem('@token', response.data.data.access_token);
		}

		return Promise.resolve(response.data);
	} catch (error) {
		console.log('errrrr', error);
		return Promise.reject(error);
	}
};
