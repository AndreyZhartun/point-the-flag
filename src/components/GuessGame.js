import React, { Component } from 'react';

import { Card, CardHeader, CardBody, CardText, CardFooter, Button } from 'reactstrap';
import { Media, UncontrolledCollapse } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faMapMarkedAlt } from '@fortawesome/free-solid-svg-icons'

import { connect } from 'react-redux';
import { changeCurrentFlag, fetchAddress, setRandomFirstIndex } from '../redux/ActionCreators';

const mapStateToProps = state => {
  return {
    flags: state.flags,
    game: state.game,
    marker: state.marker
  }
}
  
const mapDispatchToProps = dispatch => ({
  changeCurrentFlag: () => {dispatch(changeCurrentFlag())},
  fetchAddress: () => {dispatch(fetchAddress())},
  setRandomFirstIndex: () => {dispatch(setRandomFirstIndex())}
});

class GuessGame extends Component {
  //handle click
  handleConfirmation = () => {
    this.props.fetchAddress();
    this.props.changeCurrentFlag();
  }

  handleStart = () => {
    //component did mount?
    if (!this.props.game.isInProgress){
      this.props.setRandomFirstIndex();
    }
  }

  render() {
    return (
      <Card className="text-center">
      <CardHeader>Guess the country by its flag!</CardHeader>
      <CardBody>        
        <Media body>
          <Media heading>
            Drag the marker on the map to point the country.
          </Media>
        </Media>
        <Button color="primary" id="toggler" onClick={this.handleStart}>
          Start the game <FontAwesomeIcon icon={faChevronDown} />
        </Button>
        <UncontrolledCollapse toggler="#toggler">
          <Card className="gameCard">
            <CardText>
              Correct answers: {this.props.game.correctAnswers} out of {this.props.game.shownFlags.length} attempts.
            </CardText>
            <CardText>Which country uses this flag?</CardText>
            <Media left>
              <Media object src={this.props.flags[this.props.game.currentFlagIndex].path} alt="Image" />   
            </Media>
            <CardBody>
              <CardText>
                <FontAwesomeIcon icon={faMapMarkedAlt} />
                <span>
                  {this.props.marker ? 
                    " " + this.props.marker.lat +", "+ this.props.marker.lng :
                    "No marker found"}
                </span>
              </CardText>
              <Button color="primary" onClick={this.handleConfirmation}>Confirm selection</Button>
            </CardBody>
          </Card>
        </UncontrolledCollapse>
      </CardBody>
      <CardFooter className="muted">
        Made with React and leaflet.js
        <br/>Address lookup uses Nominatim API
      </CardFooter>
      </Card>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GuessGame);