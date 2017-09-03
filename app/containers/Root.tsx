// Lib Imports
import * as React from 'react';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ActionCreator } from 'typescript-fsa';

import { Link } from 'react-router-dom';
import { push } from 'react-router-redux'
import { Route, Switch, Redirect } from "react-router";

import { Grid, Row, Col } from "react-flexbox-grid";

// Local Imports
import { IState } from '../reducers/Root';
import { TodoType } from "../reducers/Todo";
import { TodoActionCreators } from "../actions/Todo";
import { RecipeContainer } from './Recipe';
import { LandingContainer } from "./Landing";
import { TopNavigationBar } from "../components/TopNavigationBar";
import { BottomNavigationBar } from "../components/BottomNavigationBar";
import { ProtectedRoute } from "../components/ProtectedRoute";
import { LoginContainer } from "./Login";


// Interfaces
interface AllProps {
	// Component Props
	topLevelProp: string;

	// Redux State Props
	title: string;
	todos: TodoType[];
	authenticated: boolean;

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
	authenticated: boolean;
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
		this.state = {
		};
	}

	render() {
		return (
			<div>
				<TopNavigationBar changePage={this.props.changePage} />
				<Grid fluid>
					<Row center="xs" middle="xs">
						<Col xs >
							<Switch>
								<ProtectedRoute path="/recipes" component={RecipeContainer} authenticated={this.props.authenticated} />
								<Route path="/login" component={LoginContainer} />
								<Route component={LandingContainer} />
							</Switch>
						</Col>
					</Row>
				</Grid>
				{this.props.authenticated && <BottomNavigationBar changePage={this.props.changePage} />}
			</div>
		);
	}
}

function mapStateToProps(state: IState): MyStateProps {
	return {
		title: state.rootState.titleMessage,
		todos: Object.values(state.todoState.todosById),
		authenticated: state.rootState.authenticated
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
