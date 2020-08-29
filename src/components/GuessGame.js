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
    prevCountryGiven: state.previousCountryGiven,
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
  handleConfirm = () => {
    this.props.fetchAddress();
  }

  render() {
    //localhost ...src={require(`../../public/${this.props.flags[this.props.game.currentFlagIndex].path}`)}
    return (
      <div className="game-card">
        <div className="media">
          <img className="media__image" src={this.props.flags[this.props.game.currentFlagIndex].path} alt="[Текущий флаг]" />
          <div className="media__text hide-on-mobile">
            <p>
              Флаг #{this.props.game.shownFlags.length + 1}
            </p>
            <p>
              Правильных ответов: {this.props.game.correctAnswers}
            </p>
          </div>
          <p className="media__text hide-on-desktop">
            <FontAwesomeIcon icon={faFlag} /> #{this.props.game.shownFlags.length + 1}
            &nbsp;|&nbsp;
            <FontAwesomeIcon icon={faCheck} /> {this.props.game.correctAnswers}
          </p>
        </div>
        <p className="hide-on-mobile">Потяните <FontAwesomeIcon icon={faMapMarkerAlt} /> маркер на карте, чтобы указать страну</p>
        <hr className="game-card__divider" />
        <p>
          <span className="hide-on-mobile">Текущие координаты</span>&nbsp;<FontAwesomeIcon icon={faMapMarkerAlt} />:&nbsp;
          {this.props.marker ?
            `${this.props.marker.lat.toFixed(2)}, ${this.props.marker.lng.toFixed(2)}` :
            "Маркер не найден"}
        </p>
        <button
          type="button"
          className="button"
          color="primary"
          disabled={this.props.requestSent || !this.props.game.isInProgress}
          onClick={this.handleConfirm}>
          <span className="hide-on-mobile">Подтвердить выбранные координаты</span>
          <span className="hide-on-desktop">
            <FontAwesomeIcon icon={faMapMarkerAlt} />
            &nbsp;
            <FontAwesomeIcon icon={faCheck} />
          </span>
        </button>
        <div hidden={!this.props.prevCountryMessage}>
          <p className="hide-on-mobile">Предыдущий флаг:</p>
          <span className="hide-on-desktop">
            <FontAwesomeIcon icon={faArrowLeft} />
            <FontAwesomeIcon icon={faFlag} />
          </span>
          <div className="media">
            <img src={this.props.game.shownFlags.length > 0 ?
              this.props.flags[this.props.game.shownFlags[this.props.game.shownFlags.length - 1]].path
              : undefined}
              className="media__image media__image_size_s" alt="[Предыдущий флаг]" />
            <span className="media__text media__text_size_s">
              <FontAwesomeIcon icon={faCheck} />
              <br />
              {this.props.prevCountryMessage}
            </span>
            <span className="media__text media__text_size_s">
              <FontAwesomeIcon icon={faMapMarkerAlt} />
              <br />
              {this.props.prevCountryGiven}
            </span>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GuessGame);