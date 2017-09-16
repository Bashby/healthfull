// Lib Imports
import { routerReducer } from 'react-router-redux';
import { combineReducers, Reducer } from 'redux';
import { reducerWithInitialState } from "typescript-fsa-reducers";

// Local Imports
import { TODO_INITIAL_STATE, ITodoState, reducerTodo } from "./Todo";
import { PROFILE_INITIAL_STATE, IProfileState, reducerProfile } from "./Profile";
import { MEALPLAN_INITIAL_STATE, IMealplanState, reducerMealplan } from "./Mealplan";
import { RootActionCreators } from "../actions/Root";

// Root state interface
interface IRootState {
	titleMessage: string;
	authenticated: boolean;
	bottomNavigationIndex: number;
}

const ROOT_INITIAL_STATE: IRootState = {
	titleMessage: "Hello World, from Root!",
	authenticated: false,
	bottomNavigationIndex: null
}

// Root state reducer
export const reducerRoot = reducerWithInitialState(ROOT_INITIAL_STATE)
	.case(RootActionCreators.updateTitleMessage, (state, payload) => {
		return {
			...state,
			titleMessage: payload
		};
	})
	.case(RootActionCreators.updateAuthenticated, (state, payload) => {
		return {
			...state,
			authenticated: payload
		};
	})
	.case(RootActionCreators.updateBottomNavigationIndex, (state, payload) => {
		return {
			...state,
			bottomNavigationIndex: payload
		};
	})
	.build();

// Entire Application State Interface
export interface IState {
	rootState: IRootState
	profileState: IProfileState
	mealplanState: IMealplanState
	todoState: ITodoState
};

// Entire Application initial state
export const INITIAL_STATE: IState = {
	rootState: ROOT_INITIAL_STATE,
	profileState: PROFILE_INITIAL_STATE,
	mealplanState: MEALPLAN_INITIAL_STATE,
	todoState: TODO_INITIAL_STATE
}

// Entire Application reducer
export const rootReducer: Reducer<IState> = combineReducers<IState>({
	rootState: reducerRoot,
	profileState: reducerProfile,
	mealplanState: reducerMealplan,
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
