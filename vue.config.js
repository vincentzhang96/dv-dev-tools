module.exports = {
    baseUrl: process.env.NODE_ENV === 'production' ?
        '/tool-store/prod/dv-dev-tools/dev/'
        : '/',
    transpileDependencies: [
        /\bvue-awesome\b/
    ]
};
