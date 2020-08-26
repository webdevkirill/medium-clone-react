import React, { createContext, useReducer } from "react";
import { LOADING, SET_AUTORIZED, SET_UNAUTORIZED, LOGOUT } from "./types";

const initialState = {
    isLoading: false,
    isLoggenIn: null,
    currentUser: null
};

const reducer = (state, action) => {
    switch (action.type) {
        case LOADING: 
            return {...state, isLoading: true}
        case SET_AUTORIZED:
            return {...state, isLoading: false, isLoggenIn: true, currentUser: action.payload}
        case SET_UNAUTORIZED:
            return {...state, isLoggenIn: false}
        case LOGOUT:
            return {...initialState, isLoggenIn: false}
        default:
            return {...state}
    }
}

export const CurrentUserContext = createContext()


export const CurrentUserPrivider = ({children}) => {
    

    const value = useReducer(reducer, initialState);

    return (
        <CurrentUserContext.Provider value={value}>
            {children}
        </CurrentUserContext.Provider>
    )
}