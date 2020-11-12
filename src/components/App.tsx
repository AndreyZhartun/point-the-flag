import React from 'react';

import GuessMap from './GuessMap';
import Header from './Header';

import { Provider } from 'react-redux';
import { ConfigureStore } from '../redux/configureStore';

const store = ConfigureStore();

const App: React.FC = () => <Provider store={store}>
  <Header />
  <GuessMap />
</Provider>;

export default App;
