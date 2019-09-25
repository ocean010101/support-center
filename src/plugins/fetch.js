let baseUrl;

export async function $fetch(url, options) {
    const finalOptions = Object.assign({}, {
        headers: {
            'Content-Type': 'application/json', //默认选项告诉服务器我们将始终在请求主体中发送JSON ，
        },
        credentials: 'include', //并告诉浏览器我们还将包含验证用户登录所需的授权令牌。
    }, options)
    const response = await fetch(`${baseUrl}${url}`, finalOptions)
    if (response.ok) {
        const data = await response.json()
        return data;
    } else {
        const message = await response.text(); //服务器总是将错误作为文本发送, 捕获它并发送给用户
        const error = new Error(message);
        error.response = response;
        throw error;
    }
}

export default {
    install(Vue, options) {
        baseUrl = options.baseUrl;
        console.log('Installed', options);
        Vue.prototype.$fetch = $fetch
    }
}