import { HandlerAPI } from '../services/HandlerAPI';

export const GetLogActivity = async (Row) => {
	try {
		const response = await HandlerAPI(
			`${process.env.REACT_APP_ROOT_API}/log`,
			'get',
			{ row: Row }
		);
		console.log('rer get log', response.data);
		return Promise.resolve(response.data);
	} catch (error) {
		console.log('error get logh', error);
		return Promise.reject(error);
	}
};
