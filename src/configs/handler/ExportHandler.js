import { HandlerAPI } from '../services/HandlerAPI';

export const ExportPerdata = async (data) => {
	try {
		const response = await HandlerAPI(
			`${process.env.REACT_APP_ROOT_API}/export/arsip/pdt`,
			'post',
			null,
			data,
			{ Accept: 'application/vnd.ms-excel' },
			'blob'
		);
		console.log('res awal export perdata', response);
		return Promise.resolve(response);
	} catch (error) {
		console.log('error awal export perdata', error);
		return Promise.reject(error);
	}
};

export const ExportPidana = async (data) => {
	try {
		const response = await HandlerAPI(
			`${process.env.REACT_APP_ROOT_API}/export/arsip/pid`,
			'post',
			null,
			data,
			{ Accept: 'application/vnd.ms-excel' },
			'blob'
		);
		console.log('res awal export pidana', response);
		return Promise.resolve(response);
	} catch (error) {
		console.log('error awal export pidana', error);
		return Promise.reject(error);
	}
};
