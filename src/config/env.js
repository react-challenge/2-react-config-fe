
const _CONFIG_ENV = {
    // development
    development: {
        BASE_URL: 'http://127.0.0.1:5000'
    },
    // production
    production: {
        BASE_URL: 'https://config.zuo11.com'
    }
}

export const CONFIG_ENV = _CONFIG_ENV[process.env.NODE_ENV || 'production']