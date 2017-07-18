// Lib Imports
import {routerReducer as routing } from 'react-router-redux';
import { combineReducers, Reducer } from 'redux';

// Local Imports
import { IAction } from '../actions/RootActions';
// import * as types from '../actions/types';

// State
export type IState = {
    readonly titleMessage: string
};

export const initialState: IState = {
    titleMessage: "Hello World",
}

export function reducer(state: IState = initialState, action: IAction): IState {
  switch (action.type) {
    default: return state;
  }
}

export const rootReducer: Reducer<IState> = combineReducers({
    reducer,
    routing
});
