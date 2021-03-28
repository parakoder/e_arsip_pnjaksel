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

export const GraphYearsHandler = async () => {
	try {
		const response = await HandlerAPI(
			`${process.env.REACT_APP_ROOT_API}/do/graph-arsip/years`,
			'get'
		);
		console.log('res awal years', response.data);
		return Promise.resolve(response.data);
	} catch (error) {
		console.log('error awal years', error);
		return Promise.reject(error);
	}
};

export const GraphStat = async (year) => {
	try {
		const response = await HandlerAPI(
			`${process.env.REACT_APP_ROOT_API}/do/graph-statistik`,
			'get',
			{ year: year }
		);
		console.log('res awal graph stat', response.data);
		return Promise.resolve(response.data);
	} catch (error) {
		console.log('error awal graph stat', error);
		return Promise.reject(error);
	}
};
