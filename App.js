import React from 'react';
import {store} from './store';
import {Provider} from 'react-redux';
import Counter from './Counter';
import Navigation from './Navigations/rootNavigation';

const App = () => {
  return (
    <Provider store={store}>
      <Navigation/>
    </Provider>
  );
};

export default App;
