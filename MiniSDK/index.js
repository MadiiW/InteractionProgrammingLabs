/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

export {PasswordStrengthmeter} from './components/PasswordStrengthmeter';
export {AccountRegistration} from './components/AccountRegistration';

AppRegistry.registerComponent(appName, () => App);
