const path = require("path");
const resolve = dir => path.resolve(__dirname, dir);

// const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
// let webpackPlugins = [new BundleAnalyzerPlugin()];

let splitChunksConfig = {};
if (process.env.NODE_ENV !== "development") {
  splitChunksConfig = {
    chunks: "all",
    name: false,
    minChunks: 1,
    maxAsyncRequests: 6,
    maxInitialRequests: 4,
    cacheGroups: {
      "react-vendor": {
        test: module =>
          /[\\/]node_modules[\\/]@?react/.test(module.context) ||
          /[\\/]node_modules[\\/]@?rc-/.test(module.context) ||
          /[\\/]node_modules[\\/]classnames/.test(module.context) ||
          /[\\/]node_modules[\\/]mobx/.test(module.context),
        priority: 10,
        reuseExistingChunk: true,
        name: "react"
      },
      "antd-vendor": {
        test: module => /[\\/]node_modules[\\/]@?antd?/.test(module.context),
        priority: 9,
        reuseExistingChunk: true,
        name: "antd"
      },
      "common-vendor": {
        test: module =>
          /[\\/]node_modules[\\/]axios/.test(module.context) ||
          /[\\/]node_modules[\\/]moment/.test(module.context) ||
          /[\\/]node_modules[\\/]dayjs/.test(module.context) ||
          /[\\/]node_modules[\\/]lodash/.test(module.context),
        priority: 8,
        reuseExistingChunk: true,
        name: "common"
      },
      vendors: {
        name: "vendors", // 优先级小于output.filename
        test: /[\\/]node_modules[\\/]/,
        minSize: 300 * 1024, // 超过200K分包
        maxSize: 500 * 1024, // 分包最大500K超出再分包
        priority: -10,
        reuseExistingChunk: true
      }
    }
  };
}

module.exports = {
  babel: {
    // 用来支持装饰器
    plugins: []
  },
  devServer: {
    port: 3070
  },
  webpack: {
    entry: [resolve("src/index.tsx")],
    alias: {
      "@": resolve("src")
    },
    configure: (webpackConfig, { paths }) => {
      // console.log("===webpackConfig", webpackConfig?.optimization?.minimize, webpackConfig?.optimization?.minimizer);
      webpackConfig.optimization.splitChunks = {
        ...webpackConfig.optimization.splitChunks,
        ...splitChunksConfig
      };
      return webpackConfig;
    }
  }
};
