import axios from 'axios';

const instance = axios;

instance.interceptors.request.use(
	async (config) => {
		var token = await localStorage.getItem('@token');
		// var token =
		//   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX3JvbGUiOiJPcGVyYXRvciIsImF1ZCI6WyJhbGxzdG9yZSJdLCJjb21wYW55X2lkIjoiVEstVFJTQ01QLTIwMTkxMDA5MTgzNDUwMDAwMDAwMSIsInVzZXJfaWQiOiJUSy1UUlNVU1ItMjAxOTEwMDkxOTAwMTAwMDAwMDA1IiwidXNlcl9uYW1lIjoiaGFsc2V5LmdyYW5kZUBnbWFpbC5jb20iLCJzY29wZSI6WyJyZWFkIiwid3JpdGUiXSwiY29tcGFueV9uYW1lIjoiUFQuIEZhbGxpbiBVbml0ZWQiLCJleHAiOjE1ODY0MTE3ODIsImF1dGhvcml0aWVzIjpbIlRyYW5zcG9ydGVyIl0sImp0aSI6IjUwMjhjYjExLTJmMzMtNDY2ZC04MjcwLTBhNjU2MzI1NDk4ZiIsImNsaWVudF9pZCI6InRydWNraW5nY2xpZW50In0.HHgCLYM8J1CywoM09A7i2ur1vL7zLMmLAxHbE1aEsQI';
		if (token !== null) {
			config.headers.Authorization = `Bearer ${token}`;
		}

		return config;
	},
	(err) => {
		return Promise.reject(err);
	}
);

export const HandlerAPI = async (
	url,
	method,
	params,
	data,
	headers,
	cancelToken
) => {
	const service = await instance({
		url: url,
		method: method,
		params: params,
		data: data,
		headers: headers,
		cancelToken: cancelToken,
	});

	return service;
};
