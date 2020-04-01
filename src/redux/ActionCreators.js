import * as ActionTypes from './ActionTypes';

export const changeMarkerPosition = (lat, lng) => ({
    type: ActionTypes.CHANGE_MARKER_POSITION,
    payload: {
        lat: lat,
        lng: lng,
    }
});

export const changeCurrentFlagIndex = (index) => ({
    type: ActionTypes.CHANGE_CURRENT_FLAG_INDEX,
    payload: {
        index: index
    }
});
