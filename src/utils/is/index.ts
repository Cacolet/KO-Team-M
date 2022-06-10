import {type} from "os";

const toString = Object.prototype.toString

/**
 * @description: 判断值是否为某个类型
 * */
export function is(val: unknown, type:string) {
    return toString.call(val) === `[object ${type}]`
}

/**
 * @description: 是否为函数
 * */
export function isFunction<T = Function>(val: unknown):val is T {
    return is(val,"Function")
}

/**
 * @description: 是否已定义
 * */