// Lib Imports
import * as React from 'react';
// import { Dispatch } from 'redux';
import { connect } from 'react-redux';

// Local Imports
import { Title } from '../components/Title';
import { TodoList } from "../components/TodoList";
import { IState } from '../reducers/Root';
import { TodoType } from "../reducers/Todo";


interface Props {
	topLevelProp: string;
	title: string;
	todos: TodoType[]
}

interface State {

}

interface MyStateProps {
	title: string;
	todos: TodoType[]
}

interface MyDispatchProps {
	// Select: (name: string) => void;
}

interface MyOwnProps {
	topLevelProp: string;
}

class RootComponent extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {};
	}
	
	render() {
		return (
			<div>
				<span>{this.props.topLevelProp}</span>
				<Title title={this.props.title} />
				<TodoList todos={this.props.todos}/>
			</div>
		);
	}
}


function mapStateToProps(state: IState): MyStateProps {
	return {
		title: state.rootState.titleMessage,
		todos: Object.values(state.todoState.todosById)
	}
}

// function mapDispatchToProps(dispatch: Dispatch<IState>): MyDispatchProps  {
// 	return {
// 		// actions: bindActionCreators(attendanceRecordActions, dispatch)
// 	}
// }

function mapDispatchToProps(): MyDispatchProps  {
	return {
		// actions: bindActionCreators(attendanceRecordActions, dispatch)
	}
}


export const RootContainer = connect<MyStateProps, MyDispatchProps, MyOwnProps>(
	mapStateToProps,
	mapDispatchToProps
)(RootComponent);