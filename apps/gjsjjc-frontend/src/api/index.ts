import {message} from 'antd';
import axios, {AxiosInstance, AxiosResponse} from 'axios';


const createAxiosInstance = (): AxiosInstance => {
    const instance = axios.create({
        validateStatus: () => true, // 不管返回的 http 状态码是多少，都不抛出错误，在响应拦截器中进行处理
        baseURL: 'http://192.168.4.148:3000/api/shaoshan',
        withCredentials: true,
    });


    // 响应拦截器
    instance.interceptors.response.use((res: AxiosResponse) => {
        const data = res.data

        if (!Object.prototype.hasOwnProperty.call(data, 'errCode')) {
            // 返回的数据中不具备 errCode 字段
            let msg = res.statusText || '服务器或网络异常，请稍后重试';
            message.error(msg);
            // 将错误往外抛，打断正常的代码执行
            return {...res, data};
        }


        // 返回的接口数据包含 errCode，符合业务预期
        if (data.errCode !== 0) {
            message.error(data.errMsg || '服务器或网络异常，请稍后重试');
            return {...res, data};
        }

        return {...res, data};
    });

    return instance;
};

export class Api {
    protected readonly axios = createAxiosInstance();

    getAreaOptions = (): Promise<AxiosResponse<any>> => {
        return this.axios.get('/area-options');
    }

    getDeviceNameOptions = () => {
        return this.axios.get('/device-name-options');
    }

    getMiddleScreenPage = (params: any) => {
        return this.axios.get('/middle-screen/page', {
            params
        });
    }

    getHistoryData = (params: any): Promise<AxiosResponse<any>> => {
        return this.axios.get('/history-data', {params});
    }
}

export const api = new Api();