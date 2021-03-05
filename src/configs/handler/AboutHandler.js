import { HandlerAPI } from '../services/HandlerAPI';

export const AboutHandler = async () => {
	try {
		const token = await localStorage.getItem('@token');
		const response = await HandlerAPI(
			`${process.env.REACT_APP_ROOT_API}/about`,
			'get',
			null,
			{ token: 'Bearer ' + token }
		);
		console.log('res awal logout', response.data);
	} catch (error) {
		console.log('error awal logout', error);
	}
};
