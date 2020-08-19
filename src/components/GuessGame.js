import React, { Component } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faFlag, faCheck, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import "../styles/GuessGame.css";

import { connect } from 'react-redux';
import { fetchAddress, setRandomFirstIndex } from '../redux/ActionCreators';

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
    //localhost ...src={require(`../../public/${this.props.flags[this.props.game.currentFlagIndex].path}`)}
    return (
      <div className="game-card">

        <div className="row">
          <div className="col-img">

            <img src={this.props.flags[this.props.game.currentFlagIndex].path} className="flag-img" alt="[Текущий флаг]" />
          </div>
          <div className="col-lead hide-on-mobile">
            <p>
              Флаг #{this.props.game.shownFlags.length + 1}
            </p>
            <p>
              Правильных ответов: {this.props.game.correctAnswers}
            </p>
          </div>
          <p className="col-lead-mobile hide-on-desktop">
            <FontAwesomeIcon icon={faFlag} /> #{this.props.game.shownFlags.length + 1}
            {" | "}
            <FontAwesomeIcon icon={faCheck} /> {this.props.game.correctAnswers}
          </p>
        </div>

        <p className="hide-on-mobile">Потяните <FontAwesomeIcon icon={faMapMarkerAlt} /> маркер на карте, чтобы указать страну</p>
        <hr />
        <p>
          <span className="hide-on-mobile">Текущие координаты</span> <FontAwesomeIcon icon={faMapMarkerAlt} />:
          {this.props.marker ?
            "  " + this.props.marker.lat.toFixed(2) + ", " + this.props.marker.lng.toFixed(2) :
            "Маркер не найден"}
        </p>
        <button
          type="button"
          className="button"
          color="primary"
          disabled={this.props.requestSent || !this.props.game.isInProgress}
          onClick={this.handleConfirmation}>
          <span className="hide-on-mobile">Подтвердить выбранные координаты</span>
          <span className="hide-on-desktop">
            <FontAwesomeIcon icon={faMapMarkerAlt} />
            &nbsp;
            <FontAwesomeIcon icon={faCheck} />
          </span>
        </button>
        <p hidden={!this.props.prevCountryMessage}>
          <hr />
          <span className="hide-on-desktop">
            <FontAwesomeIcon icon={faArrowLeft} />
            <FontAwesomeIcon icon={faFlag} />
          </span>
          <span className="hide-on-mobile">{"Предыдущий флаг: "}</span>
          <img src={this.props.game.shownFlags.length > 0 ?
            this.props.flags[this.props.game.shownFlags[this.props.game.shownFlags.length - 1]].path
            : 'temp_path'}
            className="flag-img-mini" alt="[Флаг]" />
          <br />
          {" " + this.props.prevCountryMessage}
        </p>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GuessGame);