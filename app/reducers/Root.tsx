// Lib Imports
import { routerReducer } from 'react-router-redux';
import { combineReducers, Reducer } from 'redux';
import { reducerWithInitialState } from "typescript-fsa-reducers";

// Local Imports
import { TODO_INITIAL_STATE, ITodoState, reducerTodo } from "./Todo";
import { UpdateTitleMessage } from "../actions/Root";

interface IRootState {
	titleMessage: string;
}

const ROOT_INITIAL_STATE: IRootState = {
	titleMessage: "Hello World, from Root!"
}

export const reducerRoot = reducerWithInitialState(ROOT_INITIAL_STATE)
	.case(UpdateTitleMessage, (state, payload) => {
		return {
			...state,
			titleMessage: payload
		};
	})
	.build();

// Entire Application State Interface
export interface IState {
	rootState: IRootState
	todoState: ITodoState
};

// Entire Application Initial State
export const INITIAL_STATE: IState = {
	rootState: ROOT_INITIAL_STATE,
	todoState: TODO_INITIAL_STATE
}

export const rootReducer: Reducer<IState> = combineReducers<IState>({
	rootState: reducerRoot,
	todoState: reducerTodo,
	router: routerReducer
});

// function reducer(state: IState = initialState, action: IAction): IState {
// 	let partialState: Partial<IState> | undefined;

// 	if (action.type typeof TodoActions):
// 			partialState = {
// 				todos: [...state.todos, "new_id"],
// 				todosById: {
// 					...state.todosById,
// 					"new_id": {
// 						title: action.title,//"title",
// 						description: "description"
// 					}
// 				}
// 			};
// 		case UPDATE_TODO:
// 			partialState = {
// 				todosById: {
// 					...state.todosById,
// 					state.todosById[action.id] = {
// 						title: action.title,
// 						description: action.description
// 					}
// 				}
// 			}
// 	}

// 	return partialState != null ? { ...state, ...partialState } : state;
// }
