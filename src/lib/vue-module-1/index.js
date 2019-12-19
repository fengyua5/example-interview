
import VueSPA from '../application/vue-application';

import sdk from '../sdk';

class Module extends VueSPA{
  dependencies = ['ifchange-plugin-components'];
}

//https://cn.vuejs.org/v2/guide/components-dynamic-async.html
sdk.registerModule('vue-module-1', new Module({
  data:{
    txt_name:""
  },
  //用于数据初始化
  created:function(){
    // this.txt_name = text;
  },
  template: ``
}));