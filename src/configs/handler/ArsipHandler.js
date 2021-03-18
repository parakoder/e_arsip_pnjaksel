import { HandlerAPI } from "../services/HandlerAPI";

export const GetArsipSum = async () => {
    try {
        const response = await HandlerAPI(
            `${process.env.REACT_APP_ROOT_API}/do/data-sum`,
            "get"
        );
        console.log("res awal sum graph", response.data);
        return Promise.resolve(response.data);
    } catch (error) {
        console.log("error awal sum graph", error);
        return Promise.reject(error);
    }
};

export const GetArsipPidana = async (params) => {
    try {
        const response = await HandlerAPI(
            `${process.env.REACT_APP_ROOT_API}/do/arsip/pid`,
            "get",
            params
        );
        console.log("res awal arsip pidana", response.data);
        return Promise.resolve(response.data);
    } catch (error) {
        console.log("error awal arsip pidana", error);
        return Promise.reject(error);
    }
};

export const GetArsipPerdata = async (params) => {
    try {
        const response = await HandlerAPI(
            `${process.env.REACT_APP_ROOT_API}/do/arsip/pdt`,
            "get",
            params
        );
        console.log("res awal arsip perdata", response.data);
        return Promise.resolve(response.data);
    } catch (error) {
        console.log("error awal arsip perdata", error);
        return Promise.reject(error);
    }
};
