import { createSelectorHook, useSelector } from "react-redux";
import { Action } from "redux";
import { ThunkAction } from "redux-thunk";

export interface RootState {
    game: {
        currentFlagIndex: number,
        shownFlags: number[],
        correctAnswers: number,
        isInProgress: boolean
    },
    marker: {
        lat: number,
        lng: number
    },
    errorMessage: string,
    previousCountryCorrect: string,
    previousCountryGiven: string
}

export type AppThunkAction = ThunkAction<void, RootState, unknown, Action<string>>;

export const useAppSelector = createSelectorHook<RootState, Action>();