import {ElLoading} from "element-plus";


/* 全局请求 loading(服务方式调用) */
let loadingInstance: ReturnType<typeof ElLoading.service>

const startLoading = () => {
    loadingInstance = ElLoading.service({
        fullscreen: true,
        lock: true,
        text: "Loading",
        background: "rgba(0, 0, 0, 0.7)"
    })
};
const endLoading = () => {
    // 使用Element loading-close 方法
    loadingInstance.close()
}

let needLoadingRequestCount = 0
export const showFullScreenLoading = () => {
    if (needLoadingRequestCount === 0) {
        startLoading()
    }
    needLoadingRequestCount++;
}

export const tryHideFullScreenLoading = () => {
    if (needLoadingRequestCount <= 0) return;
    needLoadingRequestCount--;
    if (needLoadingRequestCount === 0) {
        endLoading()
    }
}