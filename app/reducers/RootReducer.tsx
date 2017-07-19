// Lib Imports
import { routerReducer } from 'react-router-redux';
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

function reducer(state: IState = initialState, action: IAction): IState {
	switch (action.type) {
		default: return state;
	}
}

export const rootReducer: Reducer<IState> = combineReducers({
	reducer,
	router: routerReducer
});
