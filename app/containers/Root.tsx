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
import { RootActionCreators } from "../actions/Root";

import { RecipeContainer } from './Recipe';
import { LandingContainer } from "./Landing";
import { LoginContainer } from "./Login";
import { SignupContainer } from "./Signup";
import { AccountContainer } from "./Account";
import { MealplanContainer } from "./Mealplan";
import { GroceryListContainer } from "./GroceryList";
import { AlertsContainer } from "./Alerts";
import { ParticipantsContainer } from "./Mealplan/Participants";

import { TopNavigationBar } from "../components/TopNavigationBar";
import { BottomNavigationBar } from "../components/BottomNavigationBar";
import { ProtectedRoute } from "../components/ProtectedRoute";




// Interfaces
interface AllProps extends MyStateProps, MyDispatchProps, MyOwnProps {}

interface State {}

interface MyStateProps {
	title: string;
	todos: TodoType[];
	authenticated: boolean;
	bottomNavigationIndex: number;
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
	changePage: (path: string, state?: any) => void;
	setBottomNavigation: (index: number) => void;
	updateAuthenticated: ActionCreator<boolean>;
}

interface MyOwnProps {
}

class RootComponent extends React.Component<AllProps, State> {
	constructor(props: AllProps) {
		super(props);
		this.state = {
		};
	}

	render() {
		return (
			<div className="full-height">
				<TopNavigationBar changePage={this.props.changePage} authenticated={this.props.authenticated} updateAuthenticated={this.props.updateAuthenticated} />
				<Grid fluid>
					<Row>
						<Col>
							<Switch>
								<ProtectedRoute path="/account/people/:id" component={AccountContainer} authenticated={this.props.authenticated} innerProps={{showPeople: true}} />
								<ProtectedRoute path="/account/people" component={AccountContainer} authenticated={this.props.authenticated} innerProps={{showPeople: true}} />
								<ProtectedRoute path="/account" component={AccountContainer} authenticated={this.props.authenticated} />
								<ProtectedRoute path="/mealplan/recipes/:id" component={RecipeContainer} authenticated={this.props.authenticated} />
								<ProtectedRoute path="/mealplan/recipes" component={RecipeContainer} authenticated={this.props.authenticated} />
								<ProtectedRoute path="/mealplan/participants" component={ParticipantsContainer} authenticated={this.props.authenticated} />
								<ProtectedRoute path="/mealplan/grocerylist" component={GroceryListContainer} authenticated={this.props.authenticated} />
								<ProtectedRoute path="/mealplan/alerts" component={AlertsContainer} authenticated={this.props.authenticated} />
								<ProtectedRoute path="/mealplan" component={MealplanContainer} authenticated={this.props.authenticated} />
								<Route path="/login" component={LoginContainer} />
								<Route path="/signup" component={SignupContainer} />
								<Route component={LandingContainer} />
							</Switch>
						</Col>
					</Row>
				</Grid>
				{this.props.authenticated && <BottomNavigationBar changePage={this.props.changePage} setBottomNavigation={this.props.setBottomNavigation} index={this.props.bottomNavigationIndex} />}
			</div>
		);
	}
}

function mapStateToProps(state: IState): MyStateProps {
	return {
		title: state.rootState.titleMessage,
		todos: Object.values(state.todoState.todosById),
		authenticated: state.rootState.authenticated,
		bottomNavigationIndex: state.rootState.bottomNavigationIndex
	}
}

function mapDispatchToProps(dispatch: Dispatch<IState>): MyDispatchProps {
	return {
		...bindActionCreators(TodoActionCreators, dispatch),
		updateAuthenticated: bindActionCreators(RootActionCreators.updateAuthenticated, dispatch),
		changePage: (path: string, state?: any) => {dispatch(push(path, state))},
		setBottomNavigation: bindActionCreators(RootActionCreators.updateBottomNavigationIndex, dispatch)
	}
}

export const RootContainer = connect<MyStateProps, MyDispatchProps, MyOwnProps>(
	mapStateToProps,
	mapDispatchToProps
)(RootComponent);
