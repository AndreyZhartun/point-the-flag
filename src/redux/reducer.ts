
import * as ActionTypes from './actions/ActionTypes';
import { RootState } from './types';

export const initialState: RootState = {
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
        lng: -0.09
    },
    requestSent: false,
    errorMessage: "",
    previousCountryCorrect: "",
    previousCountryGiven: ""
};

export const Reducer = (
    state: RootState,
    action: any //FIXME
): RootState => {
    switch (action.type) {
        //записать новую позицию маркера
        case ActionTypes.CHANGE_MARKER_POSITION:
            return {
                ...state,
                marker: {
                    ...(state.marker),
                    lat: action.payload.lat,
                    lng: action.payload.lng
                }
            };
        //запомнить, что текущий флаг показан
        case ActionTypes.ADD_FLAG_TO_SHOWN_FLAGS:
            return {
                ...state,
                game: {
                    ...(state.game),
                    shownFlags: state.game.shownFlags.concat(action.payload.index)
                }
            };
        //изменить показываемый флаг
        case ActionTypes.CHANGE_CURRENT_FLAG_INDEX:
            return {
                ...state,
                game: {
                    ...(state.game),
                    currentFlagIndex: action.payload.index
                }
            };
        //засчитать правильный ответ
        case ActionTypes.COUNT_CORRECT_ANSWER:
            return {
                ...state,
                game: {
                    ...(state.game),
                    correctAnswers: state.game.correctAnswers + 1
                }
            };
        //изменить статус игры (bool вПрогрессе: да/нет)
        case ActionTypes.CHANGE_GAME_STATUS:
            return {
                ...state,
                game: {
                    ...(state.game),
                    isInProgress: action.payload.status
                }
            }
        //показать правильный ответ на предыдущий вопрос
        case ActionTypes.CHANGE_PREVIOUS_COUNTRY_CORRECT:
            return {
                ...state,
                previousCountryCorrect: action.payload.country
            }
        //показать данный игроком ответ на предыдущий вопрос
        case ActionTypes.CHANGE_PREVIOUS_COUNTRY_GIVEN:
            return {
                ...state,
                previousCountryGiven: action.payload.country
            }
        //изменить статус запроса
        case ActionTypes.CHANGE_REQUEST_STATUS:
            return {
                ...state,
                requestSent: action.payload.status
            }
        //записать новое сообщение ошибки
        case ActionTypes.HANDLE_ERROR:
            return {
                ...state,
                errorMessage: action.payload.errorMessage
            }
        default:
            return state;
    }
};