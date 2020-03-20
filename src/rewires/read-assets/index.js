
class ReadAssetsPlugin {
  apply(compiler) {
    const afterEmit = (compilation) => {
      console.log('----assets---', compiler.inputFileSystem._statStorage.data);
    };
    if (compiler.hooks) {
      const plugin = { name: 'EntryAssetsWebpackPlugin1' };

      compiler.hooks.emit.tap(plugin, afterEmit);
    } else {
      compiler.plugin('emit', afterEmit);
    }
  }
}

module.exports = (config, env) => {
  config.plugins.push(new ReadAssetsPlugin());
  return config;
};