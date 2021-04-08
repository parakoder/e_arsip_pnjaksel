import { HandlerAPI } from '../services/HandlerAPI';

export const AboutHandler = async () => {
	try {
		const response = await HandlerAPI(
			`${process.env.REACT_APP_ROOT_API}/about`,
			'get'
		);
		console.log('res awal about', response.data);
		return Promise.resolve(response.data);
	} catch (error) {
		console.log('error awal about', error);

		return Promise.reject(error);
	}
};
