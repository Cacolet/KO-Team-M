import { isArray } from "@/utils/is";


/**
 * 使用递归处理路由菜单
 * @param newArr 所有菜单数组
 * */
export function handleRouter(routerList: Menu.MenuOptions[],newArr: string[] = []) {
    routerList.forEach((item: Menu.MenuOptions) => {
        typeof item === "object" && item.path && newArr.push(item.path);
        item.children && item.children.length && handleRouter(item.children, newArr);
    });
    return newArr;
}