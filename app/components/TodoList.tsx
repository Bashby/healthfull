// Lib Imports
import * as React from 'react';

// Local Imports
import { TodoType } from '../reducers/Todo';
import { Todo } from './Todo';

interface Props {
	todos: TodoType[]
};

interface State {

};

// TodoList Component
export class TodoList extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<ul>
				{this.props.todos.map(todo => {
					return <Todo {...todo}/>
				})}
			</ul>
		);
	}
}
