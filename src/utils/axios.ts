import axios, { AxiosResponse, AxiosRequestConfig} from "axios";

const service = axios.create()

// 请求
service.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        // TODO
        return config
    },
    (error: any) => {
        Promise.reject(error)
    }
)

// 响应
service.interceptors.response.use(
    async (response:AxiosResponse) => {
        // TODO
    },
    (error: any) => {
        // TODO

        return Promise.reject(error)
    }
)

export default service