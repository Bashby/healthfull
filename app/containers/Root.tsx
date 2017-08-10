// Lib Imports
import * as React from 'react';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ActionCreator } from 'typescript-fsa';
import { Link } from 'react-router-dom';
import { push } from 'react-router-redux'
import { Route } from "react-router";
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import SvgIconPlacesSpa from 'material-ui/svg-icons/places/spa';
import RaisedButton from 'material-ui/RaisedButton';

// Local Imports
import { Title } from '../components/Title';
import { TodoList } from "../components/TodoList";
import { IState } from '../reducers/Root';
import { TodoType } from "../reducers/Todo";
import { TodoActionCreators } from "../actions/Todo";
import { RecipeContainer } from './Recipe';

// Interfaces
interface AllProps {
	// Component Props
	topLevelProp: string;

	// Redux State Props
	title: string;
	todos: TodoType[];

	// Dispatch Props
	addTodo: ActionCreator<{
		title?: string;
		description?: string;
	}>;
	updateTodo: ActionCreator<{
		id: string;
		title?: string;
		description?: string;
	}>;
	removeTodo: ActionCreator<{
		id: string;
	}>;
	changePage: (path: string) => void;
}

interface State {

}

interface MyStateProps {
	title: string;
	todos: TodoType[];
}

interface MyDispatchProps {
	addTodo: ActionCreator<{
		title?: string;
		description?: string;
	}>;
	updateTodo: ActionCreator<{
		id: string;
		title?: string;
		description?: string;
	}>;
	removeTodo: ActionCreator<{
		id: string;
	}>;
	changePage: (path: string) => void;
}

interface MyOwnProps {
	topLevelProp?: string;
}

class RootComponent extends React.Component<AllProps, State> {
	constructor(props: AllProps) {
		super(props);
		this.state = {};
	}
	
	render() {
		return (
			<div>
				<RaisedButton label="Choose an Image" onClick={() => alert("hi")} />
				<AppBar
					title="Healthfull"
					onTitleTouchTap={() => this.props.changePage("/chicken")}
					iconElementLeft={
						<IconButton onClick={() => this.props.changePage("/eggs")} tooltip="Home">
							<SvgIconPlacesSpa />
						</IconButton>
					}
				/>
				<Link to={'/recipes'}>Go to recipes</Link>
				<Link to={'/'}>Go to root</Link>
				{/* <input type="button" onClick={() => this.props.changePage()}></input>
				<input type="text" onChange={(value) => this.props.removeTodo({id: value.currentTarget.value})}></input>
				<input type="text" onChange={(value) => this.props.addTodo({title: value.currentTarget.value, description: "yo"})}></input>
				<span>{this.props.topLevelProp}</span>
				<Title title={this.props.title} />
				<TodoList todos={this.props.todos}/> */}
				<Route path="/recipes" component={RecipeContainer}/>
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

function mapDispatchToProps(dispatch: Dispatch<IState>): MyDispatchProps {
	return {
		...bindActionCreators(TodoActionCreators, dispatch),
		changePage: (path: string) => {dispatch(push(path))}
	}
}

export const RootContainer = connect<MyStateProps, MyDispatchProps, MyOwnProps>(
	mapStateToProps,
	mapDispatchToProps
)(RootComponent);
