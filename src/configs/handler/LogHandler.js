import { HandlerAPI } from '../services/HandlerAPI';

export const GetLogData = async (params) => {
	try {
		const response = await HandlerAPI(
			`${process.env.REACT_APP_ROOT_API}/log-full`,
			'get',
			params
		);
		console.log('res awal log full', response.data);
		return Promise.resolve(response.data);
	} catch (error) {
		console.log('error awal log full', error);
		return Promise.reject(error);
	}
};
