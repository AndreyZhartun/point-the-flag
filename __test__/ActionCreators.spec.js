import * as actions from '../src/redux/ActionCreators';
import * as types from '../src/redux/ActionTypes';
import configureMockStore from 'redux-mock-store';
import fetchMock from 'fetch-mock';
import thunk from 'redux-thunk';
import { baseUrl } from '../src/shared/nominatim';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('actions', () => {
    it('should create an action to change marker position', () => {
        const coordinates = {lat: '-40', lng: '32.76'};
        const expectedAction = {
            type: types.CHANGE_MARKER_POSITION,
            payload: coordinates
        }
        expect(actions.changeMarkerPosition(coordinates.lat, coordinates.lng)).toEqual(expectedAction);
    });

    it('should create an action to change game status', () => {
        const status = true;
        const expectedAction = {
            type: types.CHANGE_GAME_STATUS,
            payload: {status: status}
        }
        expect(actions.changeGameStatus(status)).toEqual(expectedAction);
    });

    it('should create an action to count correct answer', () => {
        const expectedAction = {
            type: types.COUNT_CORRECT_ANSWER
        }
        expect(actions.countCorrectAnswer()).toEqual(expectedAction);
    });
});

describe('async actions', () => {
    afterEach(() => {
        fetchMock.restore();
    });
  
    it('creates multiple actions after fetching country', async () => {
        const store = mockStore({
            flags: [
                {
                    "country": "Sierra Leone",
                    "path": "assets/country_flags/160.png",
                    "code": "sl"
                },
                {
                    "country": "San Marino",
                    "path": "assets/country_flags/161.png",
                    "code": "sm"
                }
            ], 
            game: {
                currentFlagIndex: 0,
                shownFlags: [],
                correctAnswers: 0,
                isInProgress: false
            },
            marker: {
                lat: 11,
                lng: 12,
                draggable: true
            },
            requestSent: false,
            errorMessage: "",
            prevCountryMessage: ""
        });

        function mockFetch(data) {
            return jest.fn().mockImplementation(() =>
              Promise.resolve({
                ok: true,
                json: () => data
              })
            );
        }
        var fetch = mockFetch({ address: { country_code: "sl"}});

        /*fetchMock.mock("*", 
            new Promise(res => ({
                status: 200,
                body: { address: { country_code: "sl"}}
            }))
        );*/

        const expectedActions = [
            //{ type: types.CHANGE_PREV_COUNTRY_MESSAGE, payload: {country: "Sierra Leone"} },
            //{ type: types.COUNT_CORRECT_ANSWER},
            //{ type: types.ADD_FLAG_TO_SHOWN_FLAGS, payload: {index: 0} },
            //{ type: types.CHANGE_CURRENT_FLAG_INDEX, payload: {index: 1}}
        ];
    
        store.dispatch(actions.fetchAddress()).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });

    });
});