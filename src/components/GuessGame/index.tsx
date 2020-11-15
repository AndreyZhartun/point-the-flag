import React, { useEffect, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faFlag, faCheck, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import "./GuessGame.css";

import { useDispatch, useSelector } from 'react-redux';
import { fetchAddress, setRandomFirstIndex } from '../../redux/actions/ActionCreators';

import { FLAGS } from '../../static/flags.json';
import { RootState } from '../../redux/types';

/**
 * Карточка управления игрой
 */
const GuessGame: React.FC = () => {

  const dispatch = useDispatch();

  const {
    game: {
      isInProgress,
      correctAnswers,
      currentFlagIndex,
      shownFlags
    },
    previousCountryCorrect,
    prevCountryGiven,
    marker: {
      lat, lng
    }
  } = useSelector((state: RootState) => ({
    game: state.game,
    previousCountryCorrect: state.previousCountryCorrect,
    prevCountryGiven: state.previousCountryGiven,
    marker: state.marker
  }));

  //TODO аналог componentDidMount
  useEffect(() => {
    //случайно определить первый флаг
    if (!isInProgress) {
      dispatch(setRandomFirstIndex());
    }
  }, [dispatch, isInProgress])

  const [isRequestSent, setIsRequestSent] = useState(false);

  //обработка клика на кнопку
  const handleConfirm = () => {
    dispatch(fetchAddress());
    //задержка в 1000 мс, используемый API не рекомендует посылать запросы чаще чем через 1 сек
    setIsRequestSent(true);
    setTimeout(() => setIsRequestSent(false), 1000);
  }

  //TODO иконки над ответами не выравнены при различии в занимаемых строках
  //localhost ...src={require(`../../public/${lags[currentFlagIndex].path}`)}
  return (
    <div className="game-card">
      <div className="media">
        <img className="media__image" src={FLAGS[currentFlagIndex].path} alt="[Текущий флаг]" />
        <div className="media__text hide-on-mobile">
          <p>
            Флаг #{shownFlags.length + 1}
          </p>
          <p>
            Правильных ответов: {correctAnswers}
          </p>
        </div>
        <p className="media__text hide-on-desktop">
          <FontAwesomeIcon icon={faFlag} /> #{shownFlags.length + 1}
          &nbsp;|&nbsp;
          <FontAwesomeIcon icon={faCheck} /> {correctAnswers}
        </p>
      </div>
      <p className="hide-on-mobile">Потяните <FontAwesomeIcon icon={faMapMarkerAlt} /> маркер на карте, чтобы указать страну</p>
      <hr className="game-card__divider" />
      <p>
        <span className="hide-on-mobile">Текущие координаты</span>&nbsp;
        <FontAwesomeIcon icon={faMapMarkerAlt} />:&nbsp;
        {`${lat.toFixed(2)}, ${lng.toFixed(2)}`}
      </p>
      <button
        type="button"
        className="button"
        color="primary"
        disabled={isRequestSent || !isInProgress}
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
          <img src={shownFlags.length > 0 ?
            FLAGS[shownFlags[shownFlags.length - 1]].path
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
