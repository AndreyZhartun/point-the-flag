import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/nominatim';

export const changeMarkerPosition = (lat, lng) => ({
    type: ActionTypes.CHANGE_MARKER_POSITION,
    payload: {
        lat: lat,
        lng: lng,
    }
});

export const setRandomFirstIndex = () => (dispatch, getState) => {
    //определить первый случайный индекс флага
    const randomFirstIndex = Math.floor(Math.random() * getState().flags.length);

    dispatch(changeCurrentFlagIndex(randomFirstIndex));
    //записать, что игра в прогрессе
    dispatch(changeGameStatus(true));
}

export const changeGameStatus = (status) => ({
    type: ActionTypes.CHANGE_GAME_STATUS,
    payload: {
        status: status
    }
});

export const changeCurrentFlag = () => (dispatch, getState) => {
    
}

export const fetchAddress = () => (dispatch, getState) => {
    //задержка в 1000 мс, используемый API не рекомендует посылать запросы чаще чем через 1 сек.
    dispatch(changeRequestStatus(true));
    setTimeout(() => {
            dispatch(changeRequestStatus(false))
        },
        1000
    );
    //запомнить текущий индекс и запрос
    const currentIndex = getState().game.currentFlagIndex;
    const query = baseUrl 
        + 'lat='+getState().marker.lat 
        + '&lon='+getState().marker.lng 
        + '&accept-language=ru';
    //запрос reverse к Nominatim API

    return fetch(query)
        .then(response => {
            if (response.ok){
                return response.json();
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }},
            error => {
                throw new Error(error.message);
            })
        .then((data) => {
            //записать страну, чтобы можно было узнать правильный ответ
            dispatch(changePrevCountryMessage(getState().flags[currentIndex].country));
            //если коды стран совпали, то ответ верный
            if (data.address.country_code
                    .localeCompare(getState().flags[currentIndex].code) === 0){
                        dispatch(countCorrectAnswer());
            }
            //в любом случае поменять флаг
            //dispatch(changeCurrentFlag());
            
            //добавить текущий флаг в просмотренные
            dispatch(addFlagToShownFlags(currentIndex));

            //вычесть из всех флагов уже просмотренные, чтобы получить массив из непоказанных флагов
            const possibleNewIndexes = [...Array(getState().flags.length).keys()]
                .filter(index => !getState().game.shownFlags.includes(index));

            //если непоказанных флагов нет, то конец игры
            if (possibleNewIndexes.length === 0){
                return;
            }

            //выбрать случайный индекс из не показанных раньше
            const newIndex = possibleNewIndexes[Math.floor(Math.random() * possibleNewIndexes.length)]

            dispatch(changeCurrentFlagIndex(newIndex));
        })
        .catch(error => dispatch(handleError(error.message)));
}

export const handleError = (errorMessage) => ({
    type: ActionTypes.HANDLE_ERROR,
    payload: {
        errorMessage: errorMessage
    }
});

export const changePrevCountryMessage = (country) => ({
    type: ActionTypes.CHANGE_PREV_COUNTRY_MESSAGE,
    payload: {
        country: country
    }
});

export const countCorrectAnswer = () => ({
    type: ActionTypes.COUNT_CORRECT_ANSWER
});

export const changeRequestStatus = (sent) => ({
    type: ActionTypes.CHANGE_REQUEST_STATUS,
    payload: {
        status: sent
    }
})

export const addFlagToShownFlags = (index) => ({
    type: ActionTypes.ADD_FLAG_TO_SHOWN_FLAGS,
    payload: {
        index: index
    }
});

export const changeCurrentFlagIndex = (index) => ({
    type: ActionTypes.CHANGE_CURRENT_FLAG_INDEX,
    payload: {
        index: index
    }
});
