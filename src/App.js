import React from 'react';
import './App.css';

//import { Container, Row, Col } from 'reactstrap';
//import { Card, CardHeader, CardBody, CardText, CardFooter } from 'reactstrap';

import GuessMap from './components/GuessMap';
import Header from './components/Header';
//import { FLAGS } from './shared/flags';

import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';

const store = ConfigureStore();

function App(){
  return (
    <Provider store={store}>
      <Header />
      <GuessMap />
    </Provider>
  );
}

export default App;
