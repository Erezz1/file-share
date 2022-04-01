import { useReducer } from 'react';

import AppContext from './AppContext';
import { reducerApp, initialState } from './appReducer';
import {
    CLEAR_FILE,
    SET_FILE,
    SET_FILE_UPLOAD,
    SET_LINK,
    CLEAR_LINK
} from './types';

const AppProvider = ({ children }) => {

    const [ state, dispatch ] = useReducer( reducerApp, initialState );

    const setFile = file => {
        dispatch({
            type: SET_FILE,
            payload: file
        })
    }

    const clearFile = () => {
        dispatch({
            type: CLEAR_FILE,
        })
    }

    const setFileUpload = formData => {
        dispatch({
            type: SET_FILE_UPLOAD,
            payload: formData
        })
    }

    const setLink = link => {
        dispatch({
            type: SET_LINK,
            payload: link
        })
    }

    const clearLink = () => {
        dispatch({
            type: CLEAR_LINK,
        })
    }

    return (
        <AppContext.Provider
            value={{
                // AppProvider
                ...state,
                setFile,
                clearFile,
                setFileUpload,
                setLink,
                clearLink
            }}
        >
            { children }
        </AppContext.Provider>
    )
}

export default AppProvider;
