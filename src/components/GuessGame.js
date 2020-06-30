import React, { Component } from 'react';

import { Container, Row, Col, Jumbotron, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

import { connect } from 'react-redux';
import { changeCurrentFlag, fetchAddress, setRandomFirstIndex } from '../redux/ActionCreators';

const mapStateToProps = state => {
  return {
    flags: state.flags,
    game: state.game,
    requestSent: state.requestSent,
    prevCountryMessage: state.prevCountryMessage,
    marker: state.marker
  }
}

const mapDispatchToProps = dispatch => ({
  changeCurrentFlag: () => { dispatch(changeCurrentFlag()) },
  fetchAddress: () => { dispatch(fetchAddress()) },
  setRandomFirstIndex: () => { dispatch(setRandomFirstIndex()) }
});

class GuessGame extends Component {
  constructor(props) {
    super(props);
    //случайно определить первый флаг
    if (!this.props.game.isInProgress) {
      this.props.setRandomFirstIndex();
    }
  }
  //обработка клика на кнопку
  handleConfirmation = () => {
    this.props.fetchAddress();
  }

  render() {
    return (
      <Jumbotron className="position-fixed text-center" style={{ padding: "1rem" }}>
        <Container>
          <Row>
            <Col xs="12" sm="4">
              <img src={this.props.flags[this.props.game.currentFlagIndex].path} className="flag-img" alt="[Выбранный флаг]" />
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
            "  " + this.props.marker.lat.toFixed(2) + ", " + this.props.marker.lng.toFixed(2) :
            "Маркер не найден"}
        </p>
        <p hidden={!this.props.prevCountryMessage}>
          {"Предыдущий флаг: "}
          <img src={this.props.game.shownFlags.length > 0 ?
            this.props.flags[this.props.game.shownFlags[this.props.game.shownFlags.length-1]].path
            : 'temp_path'}
            className="flag-img-mini" alt="[Флаг]" />
          {" " + this.props.prevCountryMessage}
        </p>
        <Button
          color="primary"
          disabled={this.props.requestSent || !this.props.game.isInProgress}
          onClick={this.handleConfirmation}>
          Подтвердить выбранные координаты
        </Button>
      </Jumbotron>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GuessGame);