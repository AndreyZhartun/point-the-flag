import React, { useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faFlag, faCheck, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import "../styles/GuessGame.css";

import { useDispatch, useSelector } from 'react-redux';
import { fetchAddress, setRandomFirstIndex } from '../redux/ActionCreators';

import { FLAGS } from '../shared/flags.json';

const GuessGame = () => {

  const dispatch = useDispatch();

  const {
    game,
    requestSent,
    previousCountryCorrect,
    prevCountryGiven,
    marker
  } = useSelector((state) => ({
    game: state.game,
    requestSent: state.requestSent,
    previousCountryCorrect: state.previousCountryCorrect,
    prevCountryGiven: state.previousCountryGiven,
    marker: state.marker
  }));

  //componentDidMount
  useEffect(() => {
    //случайно определить первый флаг
    console.log('xd');
    if (!game.isInProgress) {
      dispatch(setRandomFirstIndex());
    }
  }, [dispatch, game.isInProgress])

  //обработка клика на кнопку
  const handleConfirm = () => {
    dispatch(fetchAddress());
  }

  //TODO иконки над ответами не выравнены при различии в занимаемых строках
  //localhost ...src={require(`../../public/${lags[game.currentFlagIndex].path}`)}
  return (
    <div className="game-card">
      <div className="media">
        <img className="media__image" src={FLAGS[game.currentFlagIndex].path} alt="[Текущий флаг]" />
        <div className="media__text hide-on-mobile">
          <p>
            Флаг #{game.shownFlags.length + 1}
          </p>
          <p>
            Правильных ответов: {game.correctAnswers}
          </p>
        </div>
        <p className="media__text hide-on-desktop">
          <FontAwesomeIcon icon={faFlag} /> #{game.shownFlags.length + 1}
          &nbsp;|&nbsp;
          <FontAwesomeIcon icon={faCheck} /> {game.correctAnswers}
        </p>
      </div>
      <p className="hide-on-mobile">Потяните <FontAwesomeIcon icon={faMapMarkerAlt} /> маркер на карте, чтобы указать страну</p>
      <hr className="game-card__divider" />
      <p>
        <span className="hide-on-mobile">Текущие координаты</span>&nbsp;<FontAwesomeIcon icon={faMapMarkerAlt} />:&nbsp;
        {marker ?
          `${marker.lat.toFixed(2)}, ${marker.lng.toFixed(2)}` :
          "Маркер не найден"}
      </p>
      <button
        type="button"
        className="button"
        color="primary"
        disabled={requestSent || !game.isInProgress}
        onClick={handleConfirm}>
        <span className="hide-on-mobile">Подтвердить выбранные координаты</span>
        <span className="hide-on-desktop">
          <FontAwesomeIcon icon={faMapMarkerAlt} />
          &nbsp;
          <FontAwesomeIcon icon={faCheck} />
        </span>
      </button>
      <div hidden={!previousCountryCorrect}>
        <p className="hide-on-mobile">Предыдущий флаг:</p>
        <span className="hide-on-desktop">
          <FontAwesomeIcon icon={faArrowLeft} />
          <FontAwesomeIcon icon={faFlag} />
        </span>
        <div className="media">
          <img src={game.shownFlags.length > 0 ?
            FLAGS[game.shownFlags[game.shownFlags.length - 1]].path
            : undefined}
            className="media__image media__image_size_s" alt="[Предыдущий флаг]" />
          <span className="media__text media__text_size_s">
            <FontAwesomeIcon icon={faCheck} />
            <br />
            {previousCountryCorrect}
          </span>
          <span className="media__text media__text_size_s">
            <FontAwesomeIcon icon={faMapMarkerAlt} />
            <br />
            {prevCountryGiven}
          </span>
        </div>
      </div>
    </div>
  );
}

export default GuessGame;