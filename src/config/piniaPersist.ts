import { PersistOptions} from "pinia-plugin-persist";

// pinia 持久化参数配置
const piniaPersistConfig = (key: string) => {
    const persist: PersistOptions = {
        enabled: true,
        strategies: [
            {
                key,
                storage: localStorage
            }
        ]
    }
    return persist
}

export default piniaPersistConfig