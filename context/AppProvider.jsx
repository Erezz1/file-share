import { useReducer } from 'react';

import AppContext from './appContext';
import { reducerApp, initialState } from './appReducer';
import {
    CLEAR_FILE,
    SET_FILE
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

    return (
        <AppContext.Provider
            value={{
                // AppProvider
                ...state,
                setFile,
                clearFile
            }}
        >
            { children }
        </AppContext.Provider>
    )
}

export default AppProvider;
