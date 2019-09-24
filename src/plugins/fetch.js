let baseUrl;

export async function $fetch(url) {
    const response = await fetch(`${baseUrl}${url}`)
    if (response.ok) {
        const data = await response.json()
        return data;
    } else {
        const error = new Error(message)
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