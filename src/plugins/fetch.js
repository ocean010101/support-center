let baseUrl;

export default {
    install(Vue, options) {
        baseUrl = options.baseUrl;
        console.log('Installed', options);
    }
}