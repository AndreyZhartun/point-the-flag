import { FLAGS } from '../shared/flags';
import * as ActionTypes from './ActionTypes';

export const initialState = {
    flags: FLAGS,
    game: {
        currentFlagIndex: 1,
        shownFlags: []
    },
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

export const Reducer = (state, action) => {
    switch (action.type) {
        //Map
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
        //Game
        case ActionTypes.ADD_FLAG_TO_SHOWN_FLAGS:
            var newArray = state.game.shownFlags.concat(action.payload.index);
            const gameWithNewShownGames = {
                ...(state.game),
                shownFlags: newArray
                //currentFlagIndex: state.currentFlagIndex
                
            }
            return {
                ...state,
                game: gameWithNewShownGames
            };
        case ActionTypes.CHANGE_CURRENT_FLAG_INDEX:
            const newIndex = action.payload.index;
            console.log(newIndex);
            const gameWithNewIndex = {
                ...(state.game),
                currentFlagIndex: newIndex
                //shownFlags: state.shownFlags
            };
            return {
                ...state,
                game: gameWithNewIndex
            };
        default:
            return state;
    }
};