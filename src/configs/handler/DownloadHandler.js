import { HandlerAPI } from '../services/HandlerAPI';

export const DownloadFile = async (params, tag) => {
    try {
        const response = await HandlerAPI(
            `${process.env.REACT_APP_ROOT_API}/file/download`,
            'get',
            params,
            null,
            { Accept: tag === 'pdf' ? 'application/pdf' : 'application/zip' },
            'arraybuffer'
        );
        console.log('res awal download file', response);
        return Promise.resolve(response);
    } catch (error) {
        console.log('error awal download file', error);
        return Promise.reject(error);
    }
};
