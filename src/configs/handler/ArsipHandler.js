import { HandlerAPI } from '../services/HandlerAPI';

export const GetArsipSum = async () => {
	try {
		const response = await HandlerAPI(
			`${process.env.REACT_APP_ROOT_API}/do/data-sum`,
			'get'
		);
		console.log('res awal sum graph', response.data);
		return Promise.resolve(response.data);
	} catch (error) {
		console.log('error awal sum graph', error);
		return Promise.reject(error);
	}
};
