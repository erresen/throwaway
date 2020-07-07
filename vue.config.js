module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/throwaway/" : "/",
  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      args[0].title = "Throwaway";
      return args;
    });
  },
};
