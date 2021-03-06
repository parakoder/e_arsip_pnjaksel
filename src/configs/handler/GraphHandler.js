import { HandlerAPI } from '../services/HandlerAPI';

export const GraphPerYearHandler = async (year) => {
	try {
		const response = await HandlerAPI(
			`${process.env.REACT_APP_ROOT_API}/do/graph-arsip`,
			'get',
			{ year: year }
		);
		console.log('res awal graph', response.data);
		return Promise.resolve(response.data);
	} catch (error) {
		console.log('error awal graph', error);
		return Promise.reject(error);
	}
};
