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

export const GetArsipPidana = async (params) => {
	try {
		const response = await HandlerAPI(
			`${process.env.REACT_APP_ROOT_API}/do/arsip/pid`,
			'get',
			params
		);
		console.log('res awal arsip pidana', response.data);
		return Promise.resolve(response.data);
	} catch (error) {
		console.log('error awal arsip pidana', error);
		return Promise.reject(error);
	}
};

export const GetArsipPerdata = async (params) => {
	try {
		const response = await HandlerAPI(
			`${process.env.REACT_APP_ROOT_API}/do/arsip/pdt`,
			'get',
			params
		);
		console.log('res awal arsip perdata', response.data);
		return Promise.resolve(response.data);
	} catch (error) {
		console.log('error awal arsip perdata', error);
		return Promise.reject(error);
	}
};

export const AddNewArsipPerdata = async (data) => {
	try {
		const response = await HandlerAPI(
			`${process.env.REACT_APP_ROOT_API}/do/arsip/pdt`,
			'post',
			null,
			data,
			{ headers: { 'Content-Type': 'multipart/form-data' } }
		);
		console.log('res awal add arsip perdata', response.data);
		return Promise.resolve(response.data);
	} catch (error) {
		console.log('error awal add arsip perdata', error);
		return Promise.reject(error);
	}
};

export const EditArsipPerdata = async (data) => {
	try {
		const response = await HandlerAPI(
			`${process.env.REACT_APP_ROOT_API}/do/arsip/pdt`,
			'put',
			null,
			data,
			{ headers: { 'Content-Type': 'multipart/form-data' } }
		);
		console.log('res awal edit arsip perdata', response.data);
		return Promise.resolve(response.data);
	} catch (error) {
		console.log('error awal edit arsip perdata', error);
		return Promise.reject(error);
	}
};

export const DeleteArsipPerdata = async (params) => {
	try {
		const response = await HandlerAPI(
			`${process.env.REACT_APP_ROOT_API}/do/arsip/pdt`,
			'delete',
			params
		);
		console.log('res awal del arsip perdata', response.data);
		return Promise.resolve(response.data);
	} catch (error) {
		console.log('error awal del arsip perdata', error);
		return Promise.reject(error);
	}
};
