import { Action } from "redux";
import { ThunkAction } from "redux-thunk";

export interface RootState {
    game: {
        currentFlagIndex: number,
        shownFlags: number[],
        correctAnswers: number,
        isInProgress: boolean
    },
    map: {
        center: {
            lat: number,
            lng: number
        },
        zoom: number
    },
    marker: {
        lat: number,
        lng: number
    },
    requestSent: boolean,
    errorMessage: string,
    previousCountryCorrect: string,
    previousCountryGiven: string
}

export type AppThunkAction = ThunkAction<void, RootState, unknown, Action<string>>