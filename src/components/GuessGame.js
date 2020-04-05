import React, { Component } from 'react';

import { Container, Row, Col, Button } from 'reactstrap';
import { Jumbotron } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

import { connect } from 'react-redux';
import { changeCurrentFlag, fetchAddress, setRandomFirstIndex } from '../redux/ActionCreators';

const mapStateToProps = state => {
  return {
    flags: state.flags,
    game: state.game,
    requestSent: state.requestSent,
    marker: state.marker
  }
}
  
const mapDispatchToProps = dispatch => ({
  changeCurrentFlag: () => {dispatch(changeCurrentFlag())},
  fetchAddress: () => {dispatch(fetchAddress())},
  setRandomFirstIndex: () => {dispatch(setRandomFirstIndex())}
});

class GuessGame extends Component {
  constructor(props) {
    super(props);
    if (!this.props.game.isInProgress){
      this.props.setRandomFirstIndex();
    }
  }
  //handle click
  handleConfirmation = () => {
    //TODO: img names shouldnt hint
    this.props.fetchAddress();
    //this.props.changeCurrentFlag();
  }

  handleStart = () => {
    //component did mount?
    /*if (!this.props.game.isInProgress){
      this.props.setRandomFirstIndex();
    }*/
    //<img src={this.props.flags[this.props.game.currentFlagIndex].path} className="flag-img" alt="Image"/>
  }

  render() {
    return (
      <Jumbotron className="position-fixed" style={{padding:"1rem"}}>
        <Container>
          <Row>
            <Col xs="12" sm="4">
            <img src={this.props.flags[this.props.game.currentFlagIndex].path} className="flag-img" alt="[Выбранный флаг]"/>
            </Col>
            <Col>
              <p className="lead">Флаг #{this.props.game.shownFlags.length + 1} 
              </p>
              <p className="lead">
              Правильных ответов: {this.props.game.correctAnswers}
              </p>
            </Col>
          </Row>
        </Container>
        <p>Потяните <FontAwesomeIcon icon={faMapMarkerAlt} /> маркер на карте, чтобы указать страну</p>
        <hr className="my-2" />
        <p>
          Текущие координаты <FontAwesomeIcon icon={faMapMarkerAlt} />: 
          {this.props.marker ? 
            "  " + this.props.marker.lat.toFixed(2) +", "+ this.props.marker.lng.toFixed(2) :
            "Маркер не найден"}
        </p>
        <p className="lead">
        <Button color="primary" disabled={this.props.requestSent} onClick={this.handleConfirmation}>
          Подтвердить выбранные координаты
          </Button>
        </p>
      </Jumbotron>
    )
  }

  /*render() {
    return (
      <Card className="text-center">
      <CardHeader>Drag the marker on the map to point the country</CardHeader>
      <CardBody>        
        <Media body>
          <Media heading>
            Flag #{this.props.game.shownFlags.length + 1} 
            {" "}(correct answers: {this.props.game.correctAnswers})
          </Media>
        </Media>
        <Media left className="flag-img">
          <Media object src={this.props.flags[this.props.game.currentFlagIndex].path} alt="Image" />   
        </Media>
        <Button color="primary" onClick={this.handleConfirmation}>
          {" Select coordinates: "}
          <FontAwesomeIcon icon={faMapMarkerAlt} />
          {this.props.marker ? 
            "  " + this.props.marker.lat.toFixed(2) +", "+ this.props.marker.lng.toFixed(2) :
            "No marker found"}
        </Button>
      </CardBody>
      
      </Card>
    )
  }*/
}

export default connect(mapStateToProps, mapDispatchToProps)(GuessGame);