import React from 'react';
//import logo from './logo.svg';
import './App.css';

import { Container, Row, Col } from 'reactstrap';
import { Card, CardHeader, CardBody, CardText, CardFooter } from 'reactstrap';

import GuessMap from './components/GuessMap';
import Header from './components/Header';
import { FLAGS } from './shared/flags';

function App(){
  return (
    <div className="App">
      <Header />
      <Container>
        <Row className="row row-content">
          <Col xs="12" sm="6">
            <GuessMap />
          </Col>
          <Col xs="12" sm="6">
            <Card>
              <CardHeader>Card header</CardHeader>
              <CardBody>
                <CardText>text</CardText>
              </CardBody>
              <CardFooter>:)</CardFooter>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
