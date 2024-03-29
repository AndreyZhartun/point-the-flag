import * as ActionTypes from '../constants/constants';

import { FLAGS } from '../../static/flags.json';
import { AppThunkAction } from '../types';

export const changeMarkerPosition = (lat: number, lng: number) => ({
    type: ActionTypes.CHANGE_MARKER_POSITION,
    payload: {
        lat,
        lng,
    }
});

export const setRandomFirstIndex = (): AppThunkAction => (dispatch) => {
    //определить первый случайный индекс флага
    const randomFirstIndex = Math.floor(Math.random() * FLAGS.length);

    dispatch(changeCurrentFlagIndex(randomFirstIndex));
    //записать, что игра в прогрессе
    dispatch(changeGameStatus(true));
}

export const changeGameStatus = (status: boolean) => ({
    type: ActionTypes.CHANGE_GAME_STATUS,
    payload: {
        status,
    }
});

export const fetchAddress = (): AppThunkAction => (dispatch, getState) => {
    const { game, marker } = getState();
    const currentIndex = game.currentFlagIndex;

    //запрос reverse к Nominatim API
    return fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${marker.lat}&lon=${marker.lng}&accept-language=en`)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            else { // TODO add notify-like toast
                var error = new Error('Ошибка ' + response.status + ': ' + response.statusText);
                //error.response = response; FIXME
                throw error;
            }
        },
            error => {
                throw new Error(error.message);
            })
        .then((data) => {
            //записать правильный ответ для показа
            dispatch(changePreviousCountryCorrect(FLAGS[currentIndex].country));
            if (data.address !== undefined) {
                dispatch(changePreviousCountryGiven(data.address.country));
            } else {
                dispatch(changePreviousCountryGiven('N/A'));
            }
            //если коды стран совпали, то ответ верный
            if (data.address.country_code
                .localeCompare(FLAGS[currentIndex].code) === 0) {
                dispatch(countCorrectAnswer());
            }

            //добавить текущий флаг в просмотренные
            dispatch(addFlagToShownFlags(currentIndex));

            //вычесть из всех флагов уже просмотренные, чтобы получить массив из непоказанных флагов
            const possibleNewIndexes = FLAGS//[...Array(FLAGS.length).keys()]
                .filter((_, index) => !getState().game.shownFlags.includes(index))
                .map((_, index) => index);//FIXME

            //если непоказанных флагов нет, то конец игры
            if (possibleNewIndexes.length === 0) {
                return;
            }

            //выбрать случайный индекс из не показанных раньше
            const newIndex = possibleNewIndexes[Math.floor(Math.random() * possibleNewIndexes.length)]

            dispatch(changeCurrentFlagIndex(newIndex));
        })
        .catch(error => dispatch(handleError(error.message)));
}

export const handleError = (errorMessage: string) => ({
    type: ActionTypes.HANDLE_ERROR,
    payload: {
        errorMessage,
    }
});

export const changePreviousCountryCorrect = (country: string) => ({
    type: ActionTypes.CHANGE_PREVIOUS_COUNTRY_CORRECT,
    payload: {
        country,
    }
});

export const changePreviousCountryGiven = (country: string) => ({
    type: ActionTypes.CHANGE_PREVIOUS_COUNTRY_GIVEN,
    payload: {
        country,
    }
});

export const countCorrectAnswer = () => ({
    type: ActionTypes.COUNT_CORRECT_ANSWER
});

export const addFlagToShownFlags = (index: number) => ({
    type: ActionTypes.ADD_FLAG_TO_SHOWN_FLAGS,
    payload: {
        index,
    }
});

export const changeCurrentFlagIndex = (index: number) => ({
    type: ActionTypes.CHANGE_CURRENT_FLAG_INDEX,
    payload: {
        index,
    }
});
