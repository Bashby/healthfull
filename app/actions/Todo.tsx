// Lib Imports
import actionCreatorFactory from 'typescript-fsa';

// Local Imports

// Prepare action creator
const actionCreatorTodo = actionCreatorFactory("Todo");

// Action Payload Generic Types
type AddTodoPayload = {
	title: string,
	description: string
}

type UpdateTodoPayload = {
	id: string,
	title?: string,
	description?: string
}

type RemoveTodoPayload = {
	id: string,
}

// Create Actions
export const AddTodo = actionCreatorTodo<AddTodoPayload>('ADD_TODO');
export const UpdateTodo = actionCreatorTodo<UpdateTodoPayload>('UPDATE_TODO');
export const RemoveTodo = actionCreatorTodo<RemoveTodoPayload>('REMOVE_TODO');

// // Create Action Interfaces
// interface IAddTodo {
// 	ActionCreator<{
//     title: string;
//     description: string;
// }>

// Bundle and export action creators
export const TodoActionCreators = {
	addTodo: AddTodo,
	updateTodo: UpdateTodo,
	removeTodo: RemoveTodo,
};

// // Action Types
// const AddTodoActionType: String = "AddTodo";
// const UpdateTodoActionType: String = "UpdateTodo";
// const RemoveTodoActionType: String = "RemoveTodo";

// // Action Interfaces
// type AddTodoAction = Action<typeof AddTodoActionType, void>;
// type UpdateTodoAction = Action<typeof UpdateTodoActionType, void>;
// type RemoveTodoAction = Action<typeof RemoveTodoActionType, void>;

// // Action Creation Functions
// function createAddTodoAction(): AddTodoAction {
// 	return createAction(AddTodoActionType, null);
// }

// function createUpdateTodoAction(): UpdateTodoAction {
// 	return createAction(UpdateTodoActionType, null);
// }

// function createRemoveTodoAction(): RemoveTodoAction {
// 	return createAction(RemoveTodoActionType, null);
// }

// // Group Actions
// export type TodoActions = AddTodoAction
// 	| UpdateTodoAction
// 	| RemoveTodoAction;
