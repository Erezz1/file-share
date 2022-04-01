import {
    SET_FILE,
    CLEAR_FILE,
    SET_FILE_UPLOAD,
    SET_LINK,
    CLEAR_LINK
} from './types';

export const initialState = {
    isLoading: false,
    alert: null,
    file: null,
    formData: null,
    link: '',
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
            };

        case SET_FILE_UPLOAD:
            return {
                ...state,
                formData: action.payload
            };

        case SET_LINK:
            return {
                ...state,
                link: action.payload
            };

        case CLEAR_LINK:
            return {
                ...state,
                link: ''
            };

        default:
            return state;
    }
};
