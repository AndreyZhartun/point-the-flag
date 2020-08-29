import * as ActionTypes from './ActionTypes';

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

export const fetchAddress = () => (dispatch, getState) => {
    //задержка в 1000 мс, используемый API не рекомендует посылать запросы чаще чем через 1 сек.
    dispatch(changeRequestStatus(true));
    setTimeout(() => {
        dispatch(changeRequestStatus(false))
    },
        1000
    );
    const currentIndex = getState().game.currentFlagIndex;
    const query = 'https://nominatim.openstreetmap.org/reverse?format=jsonv2&'
        + 'lat=' + getState().marker.lat
        + '&lon=' + getState().marker.lng
        + '&accept-language=en';

    //запрос reverse к Nominatim API
    return fetch(query)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            else {
                var error = new Error('Ошибка ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                throw new Error(error.message);
            })
        .then((data) => {
            //записать правильный ответ для показа
            dispatch(changePreviousCountryCorrect(getState().flags[currentIndex].country));
            if (data.address !== undefined) {
                dispatch(changePreviousCountryGiven(data.address.country));
            } else {
                dispatch(changePreviousCountryGiven('N/A'));
            }
            //если коды стран совпали, то ответ верный
            if (data.address.country_code
                .localeCompare(getState().flags[currentIndex].code) === 0) {
                dispatch(countCorrectAnswer());
            }

            //добавить текущий флаг в просмотренные
            dispatch(addFlagToShownFlags(currentIndex));

            //вычесть из всех флагов уже просмотренные, чтобы получить массив из непоказанных флагов
            const possibleNewIndexes = [...Array(getState().flags.length).keys()]
                .filter(index => !getState().game.shownFlags.includes(index));

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

export const handleError = (errorMessage) => ({
    type: ActionTypes.HANDLE_ERROR,
    payload: {
        errorMessage: errorMessage
    }
});

export const changePreviousCountryCorrect = (country) => ({
    type: ActionTypes.CHANGE_PREVIOUS_COUNTRY_CORRECT,
    payload: {
        country: country
    }
});

export const changePreviousCountryGiven = (country) => ({
    type: ActionTypes.CHANGE_PREVIOUS_COUNTRY_GIVEN,
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
