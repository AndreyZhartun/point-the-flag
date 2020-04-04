import { FLAGS } from '../shared/flags.json';
//TODO: make flags json
import * as ActionTypes from './ActionTypes';

export const initialState = {
    flags: FLAGS,
    game: {
        currentFlagIndex: 0,
        shownFlags: [],
        correctAnswers: 0,
        isInProgress: false
    },
    map: {
        center: {
            lat: 40,
            lng: 12,
        },
        zoom: 3
    },
    marker: {
        lat: 51.505,
        lng: -0.09,
        draggable: true
    },
    requestSent: false,
    errorMessage: "" 
};

export const Reducer = (state, action) => {
    switch (action.type) {
        //Map
        case ActionTypes.CHANGE_MARKER_POSITION:
            const newMarker = {
                ...(state.marker),
                lat: action.payload.lat,
                lng: action.payload.lng
            };
            return {
                ...state,
                marker: newMarker
            };
        //Game
        case ActionTypes.ADD_FLAG_TO_SHOWN_FLAGS:
            var newArray = state.game.shownFlags.concat(action.payload.index);
            const gameWithNewShownFlags = {
                ...(state.game),
                shownFlags: newArray
            }
            return {
                ...state,
                game: gameWithNewShownFlags
            };
        case ActionTypes.CHANGE_CURRENT_FLAG_INDEX:
            const gameWithNewIndex = {
                ...(state.game),
                currentFlagIndex: action.payload.index
            };
            return {
                ...state,
                game: gameWithNewIndex
            };
        case ActionTypes.COUNT_CORRECT_ANSWER:
            const newCorrectAnswers = state.game.correctAnswers + 1;
            return {
                ...state,
                game: {
                    ...(state.game),
                    correctAnswers: newCorrectAnswers
                }
            };
        case ActionTypes.CHANGE_GAME_STATUS:
            return {
                ...state,
                game: {
                    ...(state.game),
                    isInProgress: action.payload.status
                }
            }
        //fetch request
        case ActionTypes.CHANGE_REQUEST_STATUS:
            return {
                ...state,
                requestSent: action.payload.status
            }
        case ActionTypes.HANDLE_ERROR:
            return {
                ...state,
                errorMessage: action.payload.errorMessage
            }
        default:
            return state;
    }
};