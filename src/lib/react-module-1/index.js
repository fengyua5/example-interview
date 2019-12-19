
import ReactSPA from '../application/react-application';

import sdk from '../sdk';

class Module extends ReactSPA{
  static dependencies = ['ifchange-plugin-components'];
}

sdk.registerModule('react-module-1', new Module());



