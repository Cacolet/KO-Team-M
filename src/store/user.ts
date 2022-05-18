import { defineStore } from "pinia";

export const useUserStore = defineStore({
    id: 'user', // id 必须 且唯一
    state: () => {
        return {
            name: "Ko-team-M"
        }
    },
    actions: {
        updateName(name: string) {
            this.name = name
        }
    }
})