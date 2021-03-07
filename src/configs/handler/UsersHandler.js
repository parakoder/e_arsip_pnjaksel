import { HandlerAPI } from '../services/HandlerAPI';

export const UpdateUserHandler = async (
	username,
	name,
	password,
	newPassword
) => {
	try {
		const response = await HandlerAPI(
			`${process.env.REACT_APP_ROOT_API}/auth/users`,
			'put',
			{ username: username },
			{ name: name, password: password, new_password: newPassword }
		);
		console.log('res awal update User', response.data);
		return Promise.resolve(response.data);
	} catch (error) {
		console.log('error awal update User', error);
		return Promise.reject(error);
	}
};

export const GetUserDetail = async (username) => {
	try {
		const response = await HandlerAPI(
			`${process.env.REACT_APP_ROOT_API}/auth/users`,
			'get',
			{ username: username }
		);
		console.log('res awal get user detail', response.data);
		return Promise.resolve(response.data);
	} catch (error) {
		console.log('error awal get user detail', error);
		return Promise.reject(error);
	}
};
