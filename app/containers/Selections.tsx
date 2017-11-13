// Lib Imports
import * as React from 'react';
import * as History from 'history';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { ThunkAction } from 'redux-thunk';
import { push } from 'react-router-redux';

import SvgIconImageNavigateNext from 'material-ui/svg-icons/image/navigate-next';
import SvgIconImageNavigateBefore from 'material-ui/svg-icons/image/navigate-before';
import SvgIconActionDone from 'material-ui/svg-icons/action/done';

// Local Imports
import { IState } from '../reducers/Root';
import { RootActionCreators } from "../actions/Root";
import { Summary } from '../components/Account/Summary';
import { People } from '../components/Account/People';
import { Person } from '../reducers/Profile';
import { ProfileActionCreators, HydrateProfileParameter, HydrateProfileResult, UpdatePersonPayload, AddPersonPayload } from '../actions/Profile';
import { AddPerson } from '../components/Account/AddPerson';
import { EditPerson } from '../components/Account/EditPerson';
import { RemovePerson } from '../components/Account/RemovePerson';
import { Grid, Col, Row } from 'react-flexbox-grid';
import { Paper, Toolbar, ToolbarGroup, ToolbarTitle, RaisedButton } from 'material-ui';
import { SelectionCard } from '../components/Selections/SelectionCard';
import { MealType } from '../reducers/Mealplan';
import { MealCard } from '../components/Mealplan/MealCard';





// Interfaces
interface AllProps extends MyStateProps, MyDispatchProps, MyOwnProps {}

interface State {
	styles : {
		button : {
			margin: number
		}
	}
	selections: {
		[id: string] : {
			[id: string] : string
		}
	}
}

interface MyStateProps {
	bottomNavigationIndex: number;
}

interface MyDispatchProps {
	setBottomNavigation: (index: number) => void;
}

interface MyOwnProps {
	location: History.Location
}

const BOTTOM_NAVIGATION_INDEX: number = 0;

// Selections Component
class SelectionsComponent extends React.Component<AllProps, State> {
	constructor(props: AllProps) {
		super(props);
		this.state = {
			styles: {
				button: {
					margin: 12,
				},
			},
			selections: {
				"dislikes" : {
					"1" : "Vegan",
					"2" : "Vegetarian",
					"3" : "Gluten Free",
					"4" : "No Soy",
					"5" : "No Nuts",
				},
				"vegetable" : {
					"1" : "Carrot",
					"2" : "Spinach",
					"3" : "Eggplant",
					"4" : "Brussel Sprout"
				},
				"fruit" : {
					"1" : "Apple",
					"2" : "Orange",
					"3" : "Tomato?",
					"4" : "Pineapple"
				},
				"starch" : {
					"1" : "Quinoa",
					"2" : "Bread",
					"3" : "Pasta",
					"4" : "Rice",
					"5" : "Beans?"
				}
			}
		};
	}

	componentWillMount() {
		// Ensures bottom navigation matches all pages managed by container
		if (this.props.bottomNavigationIndex != BOTTOM_NAVIGATION_INDEX) {
			this.props.setBottomNavigation(BOTTOM_NAVIGATION_INDEX)
		}
	}
	
	render() {
		// Parse query params, when provided
		let queryParamAction: string = undefined;
		if (this.props.location && this.props.location.search) {
			let queryParams = new URLSearchParams(this.props.location.search)
			queryParamAction = queryParams.get('stage')
		}

		// Determine the content
		let content: React.ReactNode = this.determineContent(queryParamAction)
		
		return (
			<div>
				<Grid fluid>
					{content}
				</Grid>
			</div>
		);
	}

	determineContent(action: string): React.ReactNode {
		let res: React.ReactNode = undefined;
		switch(action) {
			case "likes": {
				res = this.renderLikes();
				break;
			}
			default:
			case "dislikes": {
				res = this.renderDislikes();
				break;
			}
			case "selections": {
				res = this.renderSelections();
				break;
			}
			case "confirm": {
				res = this.renderConfirm();
				break;
			}
		}
		return res;
	}

	renderConfirm(): React.ReactNode {
		return (	
			<Row center="xs">
				Confirmed!
			</Row>
		)
	}

	renderDislikes(): React.ReactNode[] {
		let selectionCards: React.ReactNode[] = [];
		Object.entries(this.state.selections.dislikes).forEach(([id, name]) => {
			return selectionCards.push(
				<Col xs={12} sm={6} md={4} lg={3} key={id}>
					<Paper zDepth={1} style={{ margin: 12, padding: 5 }}>
						<SelectionCard name={name} />
					</Paper>
				</Col>
			)
		})

		return (
			[<Row center="xs" key="1">
				<Col xs>
					<Toolbar>
						<ToolbarGroup firstChild={false}>
							<ToolbarTitle text="Select your Dislikes" />
						</ToolbarGroup>
						<ToolbarGroup lastChild={true}>
								<Link
									to={{
										pathname: "/",
										search: "?stage=likes",
									}}
									style={this.state.styles.button}
								>
									<RaisedButton
										label="Select Favorites"
										secondary={true}
										icon={<SvgIconImageNavigateNext />}
									/>
								</Link>
							</ToolbarGroup>
					</Toolbar>
				</Col>
			</Row>,
			<Row center="xs" key="2">
				{selectionCards}
			</Row>]
		)
	}
		
	renderLikes(): React.ReactNode[] {
		let fruitSelectionCards: React.ReactNode[] = [];
		Object.entries(this.state.selections.fruit).forEach(([id, name]) => {
			return fruitSelectionCards.push(
				<Col xs={12} sm={6} md={4} lg={3} key={id}>
					<Paper zDepth={1} style={{ margin: 12, padding: 5 }}>
						<SelectionCard name={name} />
					</Paper>
				</Col>
			)
		})

		let vegetableSelectionCards: React.ReactNode[] = [];
		Object.entries(this.state.selections.vegetable).forEach(([id, name]) => {
			return vegetableSelectionCards.push(
				<Col xs={12} sm={6} md={4} lg={3} key={id}>
					<Paper zDepth={1} style={{ margin: 12, padding: 5 }}>
						<SelectionCard name={name} />
					</Paper>
				</Col>
			)
		})

		let starchSelectionCards: React.ReactNode[] = [];
		Object.entries(this.state.selections.starch).forEach(([id, name]) => {
			return starchSelectionCards.push(
				<Col xs={12} sm={6} md={4} lg={3} key={id}>
					<Paper zDepth={1} style={{ margin: 12, padding: 5 }}>
						<SelectionCard name={name} />
					</Paper>
				</Col>
			)
		})

		return (
			[<Row center="xs" key="1">
				<Col xs>
					<Toolbar>
						<ToolbarGroup firstChild={false}>
							<ToolbarTitle text="Select your Favorite Foods" />
						</ToolbarGroup>
						<ToolbarGroup lastChild={true}>
							<Link
								to={{
									pathname: "/",
									search: "?stage=dislikes",
								}}
								style={this.state.styles.button}
							>
								<RaisedButton
									label="Modify Dislikes"
									secondary={true}
									icon={<SvgIconImageNavigateBefore />}
								/>
							</Link>
							<Link
								to={{
									pathname: "/",
									search: "?stage=selections",
								}}
								style={this.state.styles.button}
							>
								<RaisedButton
									label="See Suggestions"
									secondary={true}
									icon={<SvgIconImageNavigateNext />}
								/>
							</Link>
						</ToolbarGroup>
					</Toolbar>
				</Col>
			</Row>,
			<Row center="xs" key="2a">
				<h2>Fruits</h2>
			</Row>,
			<Row center="xs" key="2b">
				{fruitSelectionCards}
			</Row>,
			<Row center="xs" key="3a">
				<h2>Vegetables</h2>
			</Row>,
			<Row center="xs" key="3b">
				{vegetableSelectionCards}
			</Row>,
			<Row center="xs" key="4a">
				<h2>Starches</h2>
			</Row>,
			<Row center="xs" key="4b">
				{starchSelectionCards}
			</Row>]
		)
	}
			
	renderSelections(): React.ReactNode[] {
		let breakfastMeals: MealType[] = [MealType.Breakfast, MealType.Breakfast, MealType.Breakfast, MealType.Breakfast];
		let lunchMeals: MealType[] = [MealType.Lunch, MealType.Lunch, MealType.Lunch, MealType.Lunch];
		let dinnerMeals: MealType[] = [MealType.Dinner, MealType.Dinner, MealType.Dinner, MealType.Dinner];
		let snackMeals: MealType[] = [MealType.Snack, MealType.Snack, MealType.Snack, MealType.Snack];

		let breakfastCards: React.ReactNode[] = [];
		let lunchCards: React.ReactNode[] = [];
		let dinnerCards: React.ReactNode[] = [];
		let snackCards: React.ReactNode[] = [];

		breakfastMeals.forEach((meal) => (
			breakfastCards.push(
				<Col key={meal.toString() + Math.random()}>
					<Paper zDepth={1} style={{ margin: 12, padding: 5 }}>
						<MealCard meal={{ type: meal }} />
					</Paper>
				</Col>
			)
		))
		lunchMeals.forEach((meal) => (
			lunchCards.push(
				<Col key={meal.toString() + Math.random()}>
					<Paper zDepth={1} style={{ margin: 12, padding: 5 }}>
						<MealCard meal={{ type: meal }} />
					</Paper>
				</Col>
			)
		))
		dinnerMeals.forEach((meal) => (
			dinnerCards.push(
				<Col key={meal.toString() + Math.random()}>
					<Paper zDepth={1} style={{ margin: 12, padding: 5 }}>
						<MealCard meal={{ type: meal }} />
					</Paper>
				</Col>
			)
		))
		snackMeals.forEach((meal) => (
			snackCards.push(
				<Col key={meal.toString() + Math.random()}>
					<Paper zDepth={1} style={{ margin: 12, padding: 5 }}>
						<MealCard meal={{ type: meal }} />
					</Paper>
				</Col>
			)
		))
		
		return (
			[<Row center="xs" key="1">
				<Col xs>
					<Toolbar>
						<ToolbarGroup firstChild={false}>
							<ToolbarTitle text="Your Meal Suggestions" />
						</ToolbarGroup>
						<ToolbarGroup lastChild={true}>
							<Link
								to={{
									pathname: "/",
									search: "?stage=dislikes",
								}}
								style={this.state.styles.button}
							>
								<RaisedButton
									label="Modify Dislikes"
									secondary={true}
									icon={<SvgIconImageNavigateBefore />}
								/>
							</Link>
							<Link
								to={{
									pathname: "/",
									search: "?stage=likes",
								}}
								style={this.state.styles.button}
							>
								<RaisedButton
									label="Modify Favorites"
									secondary={true}
									icon={<SvgIconImageNavigateBefore />}
								/>
							</Link>
							<Link
								to={{
									pathname: "/",
									search: "?stage=confirm",
								}}
								style={this.state.styles.button}
							>
								<RaisedButton
									label="Confirm Meal Selections"
									icon={<SvgIconActionDone />}
								/>
							</Link>
						</ToolbarGroup>
					</Toolbar>
				</Col>
			</Row>,
			<Row key="2a">
				<h2>Breakfasts</h2>
			</Row>,
			<Row center="xs" key="2b">
				{breakfastCards}
			</Row>,
			<Row key="3a">
				<h2>Lunches</h2>
			</Row>,
			<Row center="xs" key="3b">
				{lunchCards}
			</Row>,
			<Row key="4a">
				<h2>Dinners</h2>
			</Row>,
			<Row center="xs" key="4b">
				{dinnerCards}
			</Row>,
			<Row key="5a">
				<h2>Snacks</h2>
			</Row>,
			<Row center="xs" key="5b">
				{snackCards}
			</Row>]
		)
	}
}
		
function mapStateToProps(state: IState): MyStateProps {
	return {
		bottomNavigationIndex: state.rootState.bottomNavigationIndex
	}
}

function mapDispatchToProps(dispatch: Dispatch<IState>): MyDispatchProps {
	return {
		setBottomNavigation: bindActionCreators(RootActionCreators.updateBottomNavigationIndex, dispatch)
	}
}

export const SelectionsContainer = connect<MyStateProps, MyDispatchProps, MyOwnProps>(
	mapStateToProps,
	mapDispatchToProps
)(SelectionsComponent);
