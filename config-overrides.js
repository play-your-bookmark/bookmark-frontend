const { overrideDevServer } = require("customize-cra");

function devServerConfig() {
  return (config) => {
    return {
      ...config,
      historyApiFallback: true,
      hot: true,
      proxy: {
        "/api": {
          target: "http://localhost:7001",
          changeOrigin: true,
          pathRewrite: {
            "^/api": "/",
          },
        },
      },
      onBeforeSetupMiddleware: (devServer) => {
        devServer.app.get("/api/key", (req, res) => {
          res.json([{ key: "aaa" }]);
        });
      },
    };
  };
}

module.exports = {
  devServer: overrideDevServer(devServerConfig()),
};
