//我们可以在需要时在组件文件中导人state,但使用Vue 原型上名为$state 的特殊getter 访问它更为方便。我们将state 对象传递给插件选项， getter将返回它。
export default {
    install(Vue, state) {
        Object.defineProperty(Vue.prototype, '$state', {
            get: () => state,
        })
    }
}
