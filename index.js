/**
 * @format
 */

import {AppRegistry,LogBox} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
LogBox.ignoreLogs([ 'Non-serializable values were found in the navigation state', ]);

AppRegistry.registerComponent(appName, () => App);
