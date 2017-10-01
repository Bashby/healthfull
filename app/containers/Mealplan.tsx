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
import { ActionCreator, Action } from "typescript-fsa/lib";
import { MealplanActionCreators, UpdateMealplanPayload, AddMealplanPayload, AddMealPlanWrapped, AddMealplanParticipantPayload, RemoveMealplanAlertPayload, AddMealplanAlertPayload, RemoveMealplanMealPayload, AddMealplanMealPayload, RemoveMealplanParticipantPayload } from "../actions/Mealplan";
import { Person } from "../reducers/Profile";


// Interfaces
interface AllProps extends MyStateProps, MyDispatchProps, MyOwnProps {}

interface State {
	mealplanId?: string;
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
	updateActiveMealplan: ActionCreator<string>;
	addMealplan: ActionCreator<AddMealplanPayload>;
	updateMealplan: ActionCreator<UpdateMealplanPayload>;
	removeMealplan: ActionCreator<string>;
	addMealplanParticipant: ActionCreator<AddMealplanParticipantPayload>;
	removeMealplanParticipant: ActionCreator<RemoveMealplanParticipantPayload>;
	addMealplanMeal: ActionCreator<AddMealplanMealPayload>;
	removeMealplanMeal: ActionCreator<RemoveMealplanMealPayload>;
	addMealplanAlert: ActionCreator<AddMealplanAlertPayload>;
	removeMealplanAlert: ActionCreator<RemoveMealplanAlertPayload>;
	addMealPlanWrapped: (payload: Mealplan) => string;
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

		// Create a new plan to edit, if none is currently active
		if (!this.hasActivePlan) {
			let id = this.props.addMealPlanWrapped({
				name: "",
				startDate: null,
				endDate: null,
				lengthInDays: 7,
				participants: [],
				meals: {},
				alerts: {}
			})
			this.setState({mealplanId: id})
			this.props.updateActiveMealplan(id)
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
					mealplanId={this.state.mealplanId}
					updateActiveMealplan={this.props.updateActiveMealplan}
					updateMealplan={this.props.updateMealplan}
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
		...bindActionCreators(MealplanActionCreators, dispatch),
		addMealPlanWrapped: (payload: Mealplan) => {
			let action = AddMealPlanWrapped(payload);
			dispatch(action);
			return action.payload.id;
		}
	}
}

export const MealplanContainer = connect<MyStateProps, MyDispatchProps, MyOwnProps>(
	mapStateToProps,
	mapDispatchToProps
)(MealplanComponent);
