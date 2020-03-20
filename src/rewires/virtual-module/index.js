const path = require('path');
const fs = require('fs');
const { paths } = require('@ifchange-engr/scripts-util');

const VirtualModuleWebpackPlugin = require('virtual-module-webpack-plugin');

const getRouteList = (routePath = './src/pages', importPath = 'pages') => {
  console.log(path.resolve(paths.appRoot, routePath, 'todo', 'index.js'), '---');
  const list = fs.readdirSync(path.join(paths.appRoot, routePath))
    .filter((name) => {
      const resolvePath = path.resolve(paths.appRoot, routePath, name, 'index.js');
      return fs.existsSync(resolvePath);
    });

  return `import loadable from '@loadable/component';
export default {
  ${list.map((name) => `'${name}': loadable(()=>import('@${importPath}/${name}'))`).join(',')}
}`;

};

const createVirtualPlugin = options => {
  const {
    //route所在的目录
    routePath,
    //异步导入的时候router的目录
    importPath,
    moduleName = './src/chunkMap.js'
  } = options || {};
  return (config, env) => {

    config.plugins.push(
      new VirtualModuleWebpackPlugin({
        moduleName: moduleName,
        contents: getRouteList(routePath, importPath)
      })
    );
    return config;
  };
};

const rewiredVirtual = createVirtualPlugin({});

rewiredVirtual.withOption = createVirtualPlugin;

module.exports = rewiredVirtual;

