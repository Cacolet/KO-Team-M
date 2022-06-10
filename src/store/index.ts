import { createPinia,defineStore } from "pinia";
import { GlobalState, ThemeConfigProp} from "./interface";
import piniaPersist from "pinia-plugin-persist";
import piniaPersistConfig from "@/config/piniaPersist";

// defineStore 调用后返回一个函数 调用该函数获得 Store 实体
export const GlobalStore = defineStore({
    id: "GlobalState",
    // state: 返回对象的函数
    state: (): GlobalState => ({
        // token
        token: "",
        userInfo: "",
        assemblySize: "default",
        language: "",
        themeConfig: {
            primary: "#409eff",
            isDark: false
        }
    }),
    getters: {},
    actions: {
        // setToken
        setToken(token: string){
            this.token = token;
        },

        // setUserInfo
        setUserInfo(userInfo: any){
            this.userInfo = userInfo;
        },

        // setAssemblySize
        setAssemblySize(assemblySize: string){
            this.assemblySize = assemblySize
        }
    }
})
const pinia = createPinia();
pinia.use(piniaPersist)
export default pinia;