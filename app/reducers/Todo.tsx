// Lib Imports
import { reducerWithInitialState } from "typescript-fsa-reducers";
import { v4 as uuidv4 } from 'uuid';

// Local Imports
import { AddTodo, UpdateTodo, RemoveTodo } from "../actions/Todo"

// Todo State Interface
export interface ITodoState {
	todos: string[];
	todosById: {
		[id: string] : TodoType
	};
};

export type TodoType = {
	title: string,
	description: string
};

export const TODO_INITIAL_STATE: ITodoState = {
	todos: ["awdawd"],
	todosById: {
		"awdawd": {
			title: "hello I already exist",
			description: "already existed bitch!"
		}
	}
}

export const reducerTodo = reducerWithInitialState(TODO_INITIAL_STATE)
	.case(AddTodo, (state, payload) => {
		// Generate UUID for new todo
		let newId = uuidv4();

		// Add
		let newtodos = state.todos.slice();
		newtodos.push(newId);

		return {
			...state,
			todosById: {
				...state.todosById,
				[newId]: payload
			},
			todos: newtodos
		};
	})
	.case(UpdateTodo, (state, payload) => ({
		...state,
		todosById: {
			...state.todosById,
			[payload.id]: Object.assign(state.todosById[payload.id], payload)
		}
	}))
	.case(RemoveTodo, (state, payload) => {
		// Remove
		let newTodosById = state.todosById;
		let newTodos = state.todos;
		delete newTodosById[payload.id];
		newTodos.splice(newTodos.indexOf(payload.id), 1);
		
		return {
			...state,
			todosById: newTodosById,
			todos: newTodos
		}
	})
	.build();