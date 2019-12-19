import {createBrowserHistory} from 'history';
import axios, {CancelToken} from 'axios';
import get from 'lodash/get';
import loader from './loader'

const pathMatch = () => {
};

class Sdk {
  constructor(options) {
    this.modules = {};
    this.moduleCache = {};
    this.plugins = {};
    this.pluginCache = {};
    this.history = createBrowserHistory();
    this.currentModule = null;
    const config = get(window, 'MICRO_SERVICE_CONFIG', null);
    this.__config = config ? Promise.resolve(config) : axios.get('/micro-service-config').then(({data}) => {
      if (data.err_no === 0) {
        return data.results;
      } else {
        throw new Error('没有正确地获取到配置文件');
      }
    });

    this.history.push(this.locationChange);
  }

  locationChange() {
    this.matchCurrentModule().then((moduleName) => {
      if (this.currentModule !== moduleName) {
        this.loadModule(moduleName);
      }
    })
  }

  fetchModule = async (name) => {
    if (this.moduleCache[name]) {
      return this.moduleCache[name];
    }
    const response = await axios.get('/micro-service', {
      params: {name},
      cancelToken: new CancelToken((callback) => {
        this.__microServiceCancel = callback;
      })
    });
    return this.moduleCache[name] = response.data.results;
  };

  loadModule = async (name) => {
    //从后端请求模块资源地址
    let results = await this.fetchModule();
    const origin = get(results, 'origin'),
      assets = get(origin, 'assets');
    //加载拉去的资源文件
    await loader(origin, {
      js: get(assets, 'js', []),
      css: get(assets, 'css', [])
    });
    //执行微服务实例
    this.modules[name].render();
  };

  matchCurrentModule = () => {
    return this.__config.then((config) => {
      const matchList = get(config, 'matchList', []);
      return matchList.find((match) => pathMatch(this.history.location.pathname, match), 'name');
    })
  };

  registerModule = (name, app) => {

    if(!name){
      throw new Error('name is required');
    }

    let dependencies = app.dependencies || [];
    return new Promise((resolve, reject) => {
      this.registerPlugins(dependencies);
      resolve();
    }).then(() => {
      this.modules[name] = app;
    })
  };

  prefetchModule = async (name) => {
    this.loadModule(name);
  };

  fetchPlugin = async (name) => {
    if(this.pluginCache[name]){
      return this.pluginCache[name];
    }
    let source = await axios.get('/micro-service-plugin', {
      params: {name}
    });
    return this.pluginCache[name] = source;
  };

  registerPlugins = async (plugins = []) => {
    let pluginNames = await Promise.all(plugins.map((name) => this.fetchPlugin(name)));
    return pluginNames;
  };
}

export default new Sdk();