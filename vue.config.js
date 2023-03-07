const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  transpileDependencies: true,

  devServer: {
    disableHostCheck: true,
    proxy: {
      '^/api': {
        target: process.env.VUE_APP_BASE_URL,
        ws: true,
        changeOrigin: true,
      },
    },
  },

  css: {
    loaderOptions: {
      sass: {
        additionalData: `
          @import "@/assets/style/main.scss";
        `,
      },
    },
  },
});
