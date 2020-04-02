import * as ActionTypes from './ActionTypes';

export const changeMarkerPosition = (lat, lng) => ({
    type: ActionTypes.CHANGE_MARKER_POSITION,
    payload: {
        lat: lat,
        lng: lng,
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
