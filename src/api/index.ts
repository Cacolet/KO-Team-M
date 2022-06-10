import axios, {AxiosInstance, AxiosError, AxiosRequestConfig, AxiosResponse} from "axios";
// import { }
import {AxiosCanceler} from "@/api/hleper/axiosCancel";
import {GlobalStore} from "@/store";
import {ResultEnum} from "@/enums/httpEnum";
import router from "@/routers"

const globalStore = GlobalStore();

const axiosCanceler = new AxiosCanceler()

const config = {
    // 默认地址
    baseURL: import.meta.env.VITE_API_URL as string,
    // 设置超时时间
    timeout: ResultEnum.TIMEOUT as number,
    // 跨域的时候允许携带凭证
    withCredentials: true
};

class RequestHttp {
    service: AxiosInstance;
    public constructor(config:AxiosRequestConfig){
        // 实例化axios
        this.service = axios.create(config);
        /**
         * @description: 请求拦截器
         * */

    }
}