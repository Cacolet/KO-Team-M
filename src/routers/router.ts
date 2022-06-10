import {createRouter, createWebHistory, RouteRecordRaw} from "vue-router";


// 导入所有router
//

// 处理导入的路由


const routes: RouteRecordRaw[] = [
    {
        path: "/",
        redirect: { name: "login" }
    },
    {
        path:"/",
        name:"login",
        component: () => import("@/views/login/index.vue"),
        meta: {
            requireAuth: false,
            title: "登录页",
            key: "login"
        }
    },
    {
        path: "/:pathMatch(.*)",
        redirect: {name: "404"}
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    strict: false,
    // 切换页面滚动到最顶部
    scrollBehavior: () => ({left: 0,top: 0})
})

export default router