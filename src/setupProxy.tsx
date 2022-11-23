import createProxyMiddleware from 'http-proxy-middleware'

module.exports = function (app) {
  app.use('/api',
    createProxyMiddleware({
      target: "teamther.cjhnbi27czq0.ap-northeast-2.rds.amazonaws.com",
      changeOrigin: true
    })
  );
};
