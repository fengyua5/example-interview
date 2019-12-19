
import VueSPA from '../application/vue-application';

import sdk from '../sdk';

class Module extends VueSPA{
  static dependencies = ['ifchange-plugin-components'];
}

sdk.registerModule('vue-module-1', new Module({
  data:{
    txt_name:""
  },
  //用于数据初始化
  created:function(){
    this.txt_name = text;
  },
  template: ``
}));