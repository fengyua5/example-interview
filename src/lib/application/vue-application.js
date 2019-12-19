
import Vue from 'vue/dist/vue.min.js';

import Application from './index';

const defaultOpts = {
  selector: '#app'
};

export default class VueApplication extends Application{
  constructor(options){
    super();
    this.options = {
      ...defaultOpts,
      ...options,
    };
  }

  render = ({module}) => {
    let opts = this.options;

    if(isFunction(opts.render)){
      return opts.render(Vue)
    }

    return new Vue({
      ...module,
      el: opts.selector,
    })
  }
}