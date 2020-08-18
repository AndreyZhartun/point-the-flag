import React from 'react';

import GuessMap from './components/GuessMap';
import Header from './components/Header';

import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';

const store = ConfigureStore();

function App() {
  return (
    <Provider store={store}>
      <Header />
      <GuessMap />
    </Provider>
  );
}

export default App;
