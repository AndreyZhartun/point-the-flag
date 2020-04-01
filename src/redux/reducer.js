import { FLAGS } from '../shared/flags';
import * as ActionTypes from './ActionTypes';

export const initialState = {
    flags: FLAGS,
    map: {
        center: {
            lat: 51.505,
            lng: -0.09,
        },
        zoom: 3
    },
    marker: {
        lat: 51.505,
        lng: -0.09,
        draggable: true
    }
};

export const Reducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.CHANGE_MARKER_POSITION:
            var newPosition = action.payload;
            const newMarker = {
                lat: newPosition.lat,
                lng: newPosition.lng,
                draggable: state.marker.draggable
            };
            return {
                ...state,
                marker: newMarker
            };
        default:
            return state;
    }
};