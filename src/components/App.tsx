import React from 'react';

import GuessMap from './GuessMap';
import Header from './Header';

import { Provider } from 'react-redux';
import { configureStore } from '../redux/configureStore';

const store = configureStore();

const App: React.FC = () => <Provider store={store}>
  <Header />
  <GuessMap />
</Provider>;

export default App;
