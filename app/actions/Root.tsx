// Lib Imports
import actionCreatorFactory from 'typescript-fsa';

// // Generic Action Interface
// export interface Action<T, P> {
// 	readonly type: T;
// 	readonly payload?: P;
// }

// // Generic Action Creation Function
// export function createAction<T extends String, P>(type: T, payload: P): Action<T,P> {
// 	return {type, payload};
// }

// Prepare action creator
const actionCreatorRoot = actionCreatorFactory("Root");

// Create Actions
export const UpdateTitleMessage = actionCreatorRoot<string>('UPDATE_TITLE_MESSAGE');

// // Local Imports


// // Action Structure
// // export type IActions = {
// // 	ADD_TODO: {
// // 		type: typeof ADD_TODO,
// // 		title: string,
// // 		description: string
// // 	},
// // 	UPDATE_TODO: {
// // 		type: typeof UPDATE_TODO,
// // 		id: string
// // 	},
// // 	REMOVE_TODO: {
// // 		type: typeof REMOVE_TODO,
// // 		id: string
// // 	},
// // };

// // export type IAction = IActions[keyof IActions];

// // Action Creators
// export const actionCreators = {
// 	addTodo: createAddTodoAction,
// 	updateTodo: createUpdateTodoAction,
// 	removeTodo: createRemoveTodoAction,
// };