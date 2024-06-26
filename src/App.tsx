import React from 'react';
import {Provider} from 'react-redux';
import AppNavigator from './navigation';
import store from './redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
};

export default App;
