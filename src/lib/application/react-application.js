
import React from 'react';

import ReactDOM from 'react-dom';

import Application from './index';

import isFunction from 'lodash/isFunction';

const defaultOpts = {
  // required opts
  React: null,
  ReactDOM: null,
  selector: '#app',
  suppressComponentDidCatchWarning: false,

  // optional opts
  domElementGetter: null,
  parcelCanUpdate: true, // by default, allow parcels created with single-spa-react to be updated
};

export default class ReactApplication extends Application{

  constructor(options){
    super();
    this.options = {
      ...defaultOpts,
      ...options,
    };
  }

  render = ({module: App, props}) => {
    let opts = this.options;

    if(isFunction(opts.render)){
      return opts.render(opts.ReactDOM)
    }

    return ReactDOM.render((
      <App {...props} />
    ), document.querySelector(opts.selector));
  }
}