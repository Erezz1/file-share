import {
    SET_FILE,
    CLEAR_FILE
} from './types';

export const initialState = {
    isLoading: false,
    alert: null,
    file: null
};

export const reducerApp = ( state = initialState, action ) => {
    switch ( action.type ) {

        case SET_FILE:
            return {
                ...state,
                file: action.payload
            };

        case CLEAR_FILE:
            return {
                ...state,
                file: null
            }

        default:
            return state;
    }
};
