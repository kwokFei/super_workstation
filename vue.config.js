module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
        ? '/super_workstation/'
        : '/',
    assetsDir: 'static'
}