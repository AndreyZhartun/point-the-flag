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
    //TODO: initialize new index after Start Game
    const randomFirstIndex = Math.floor(Math.random() * getState().flags.length);

    dispatch(changeCurrentFlagIndex(randomFirstIndex));
    dispatch(changeGameStatus(true));
}

export const changeGameStatus = (status) => ({
    type: ActionTypes.CHANGE_GAME_STATUS,
    payload: {
        status: status
    }
});

export const changeCurrentFlag = () => (dispatch, getState) => {
    const currentIndex = getState().game.currentFlagIndex;

    //TODO: prevent adding duplicates
    dispatch(addFlagToShownFlags(currentIndex));

    //array substraction
    const possibleNewIndexes = [...Array(getState().flags.length).keys()]
        .filter(index => !getState().game.shownFlags.includes(index));

    //check if there is unshown flags
    if (possibleNewIndexes.length === 0){
        return;
    }

    //finding new index
    const newIndex = possibleNewIndexes[Math.floor(Math.random() * possibleNewIndexes.length)]

    dispatch(changeCurrentFlagIndex(newIndex));
}

export const fetchAddress = () => (dispatch, getState) => {
    //var response = fetch(baseUrl + 'lat='+getState().marker.lat+'&lon='+getState().marker.lng);
    //var json = response.json();
    //console.log(json);
    fetch(baseUrl + 'lat='+getState().marker.lat+'&lon='+getState().marker.lng)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            if (data.address.country_code
                    .localeCompare(getState().flags[getState().game.currentFlagIndex].code) === 0){
                        dispatch(countCorrectAnswer());
            }
            console.log(data.address);
        });
}

export const countCorrectAnswer = () => ({
    type: ActionTypes.COUNT_CORRECT_ANSWER
});

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
