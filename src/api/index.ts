import axios, {AxiosInstance, AxiosError, AxiosRequestConfig, AxiosResponse} from "axios";
import {showFullScreenLoading, tryHideFullScreenLoading} from "@/config/serviceLoading";
import {AxiosCanceler} from "@/api/helper/axiosCancel";
import {GlobalStore} from "@/store";
import {ResultEnum} from "@/enums/httpEnum";
import {ResultData} from "@/api/interface";
import router from "@/routers"
import {checkStatus} from "@/api/helper/checkStatus";
import {ElMessage} from "element-plus";

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

    public constructor(config: AxiosRequestConfig) {
        // 实例化axios
        this.service = axios.create(config);
        /**
         * @description: 请求拦截器
         * 客户端发送请求
         *  token校验(jwt): 接受服务器返回的token 存储到vuex/本地存储中
         * */
        this.service.interceptors.request.use(
            (config: AxiosRequestConfig) => {
                // 将当前请求添加到opening中
                axiosCanceler.addPending(config);

                showFullScreenLoading()
                const token: string = globalStore.token;
                console.log(token)
                return {...config, headers: {"x-access-token": token}}
            },
            (error: AxiosError) => {
                return Promise.reject(error)
            }
        );

        /**
         * @description: 响应拦截器
         * 服务器返回信息 -> [拦截统一处理] -> 客户端js获取到信息
         * */
        this.service.interceptors.response.use(
            (response: AxiosResponse) => {
                const {data, config} = response;
                // * 在请求结束前 移除本次请求
                axiosCanceler.removePending(config)
                tryHideFullScreenLoading()
                // * 登录失败 (code == 599)
                if (data.code == ResultEnum.OVERDUE) {
                    ElMessage.error(data.msg)
                    globalStore.setToken("")
                    router.replace({
                        path: '/login'
                    })
                    return Promise.reject(data)
                }

                // * 全局错误信息拦截(防止下载文件得时候返回数据流 没有code 直接报错)
                if (data.code && data.code !== ResultEnum.SUCCESS) {
                    ElMessage.error(data.msg)
                    return Promise.reject(data)
                }

                // * 成功请求
                return data
            },
            async (error: AxiosError) => {
                const {response} = error
                tryHideFullScreenLoading()
                // 根据响应的错误状态码 做不同的处理
                if(response) return checkStatus(response.status)
                // 服务器结果都没有返回(可能服务器错误可能客户端断网) 断网处理: 可以跳转到断网页面
                if (!window.navigator.onLine) return router.replace({path: "/500"})
                return Promise.reject(error)
            }
        )
    }

    // * 常用方法请求封装
    get<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
        return this.service.get(url, {params, ..._object})
    }

    post<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
        return this.service.post(url, params, _object)
    }

    put<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
        return this.service.put(url, params, _object)
    }

    delete<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
        return this.service.delete(url, {params, ..._object})
    }
}

export default new RequestHttp(config)