// Lib Imports
import * as React from 'react';
import * as History from 'history';

import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { Grid, Col, Row } from "react-flexbox-grid";

// Local Imports
import { IState } from '../reducers/Root';
import { Mealplan } from "../reducers/Mealplan";
import { RootActionCreators } from "../actions/Root";
import { MealplanSummary } from "../components/Mealplan/Summary";
import { MealplanCreate } from "../components/Mealplan/Create";
import { ActionCreator } from "typescript-fsa/lib";
import { MealplanActionCreators, UpdateMealplanPayload } from "../actions/Mealplan";
import { Person } from "../reducers/Profile";


// Interfaces
interface AllProps extends MyStateProps, MyDispatchProps, MyOwnProps {}

interface State {
	styles: {
	}
}

interface MyStateProps {
	bottomNavigationIndex: number;
	activePlan: string;
	mealplans: {
		[id: string] : Mealplan
	}
	people: {
		[id: string] : Person
	};
}

interface MyDispatchProps {
	setBottomNavigation: (index: number) => void;
	addMealplan: ActionCreator<Mealplan>;
	updateMealplan: ActionCreator<UpdateMealplanPayload>;
	removeMealplan: ActionCreator<string>;
	updateActiveMealplan: ActionCreator<string>;
}

interface MyOwnProps {
	location: History.Location
}

const BOTTOM_NAVIGATION_INDEX: number = 0;

// Mealplan Component
class MealplanComponent extends React.Component<AllProps, State> {
	constructor(props: AllProps) {
		super(props);
		this.state = {
			styles: {
			}
		};
	}

	componentWillMount() {
		// Ensures bottom navigation matches all pages managed by container
		if (this.props.bottomNavigationIndex != BOTTOM_NAVIGATION_INDEX) {
			this.props.setBottomNavigation(BOTTOM_NAVIGATION_INDEX)
		}
	}

	hasActivePlan = this.props.activePlan && this.props.mealplans[this.props.activePlan]
	
	render() {
		return (
			this.hasActivePlan
				? <MealplanSummary
					mealplan={this.props.mealplans[this.props.activePlan]}
				/>
				: <MealplanCreate
					addMealplan={this.props.addMealplan}
					updateActiveMealplan={this.props.updateActiveMealplan}
					people={this.props.people}
				/>
		);
	}
}

function mapStateToProps(state: IState): MyStateProps {
	return {
		bottomNavigationIndex: state.rootState.bottomNavigationIndex,
		activePlan: state.mealplanState.activePlan,
		mealplans: state.mealplanState.mealplans,
		people: state.profileState.people
	}
}

function mapDispatchToProps(dispatch: Dispatch<IState>): MyDispatchProps {
	return {
		setBottomNavigation: bindActionCreators(RootActionCreators.updateBottomNavigationIndex, dispatch),
		...bindActionCreators(MealplanActionCreators, dispatch)
	}
}

export const MealplanContainer = connect<MyStateProps, MyDispatchProps, MyOwnProps>(
	mapStateToProps,
	mapDispatchToProps
)(MealplanComponent);
