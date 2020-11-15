import { createStore, applyMiddleware } from 'redux';
import { reducer, initialState } from './reducer';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

export const configureStore = () => {
    const store = createStore(
        reducer,
        initialState,
        applyMiddleware(thunk, logger)
    );

    return store;
}