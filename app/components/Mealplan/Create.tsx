// Lib Imports
import * as React from 'react';
import { Grid, Row, Col } from "react-flexbox-grid";
import { Link } from "react-router-dom";
import { TextField, AppBar, Paper, Checkbox, Toolbar, ToolbarGroup, ToolbarTitle, RaisedButton } from "material-ui";
import { ActionCreator } from "typescript-fsa/lib";
import SvgIconCommunicationImportContacts from 'material-ui/svg-icons/communication/import-contacts';
import SvgIconSocialPersonAdd from 'material-ui/svg-icons/social/person-add';
import { v4 as uuidv4 } from 'uuid';

// Local Imports
import { Mealplan, MealType } from "../../reducers/Mealplan";
import { Person } from "../../reducers/Profile";
import { PersonCard } from "../PersonCard";
import { MealCard } from "./MealCard";
import { UpdateMealplanPayload } from "../../actions/Mealplan";

interface Props {
	mealplanId: string
	updateActiveMealplan: ActionCreator<string>;
	updateMealplan: ActionCreator<UpdateMealplanPayload>;
	people: {
		[id: string] : Person
	};
};

interface State {
	length: number,
	styles: {
		button: {
			margin: number
		}
	}
};

// Mealplan Create Component
export class MealplanCreate extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			length: 7,
			styles: {
				button: {
					margin: 12
				}
			}
		};
	}

	// UpdateMealplanPeople = (personId) => { this.props.updateMealplan({id:this.props.mealplanId, })}

	render() {
		let peopleCards: React.ReactNode[] = [];
		Object.entries(this.props.people).forEach(([id, person]) => (
			peopleCards.push(
				<Col key={id}>
					<Paper zDepth={1} style={{ margin: 12, padding: 5 }}>
						<PersonCard person={person} personId={id} selectable={true} />
					</Paper>
				</Col>
			)
		))

		let meals: MealType[] = [MealType.Breakfast, MealType.Lunch, MealType.Dinner, MealType.Snack];
		let mealCards: React.ReactNode[] = [];
		meals.forEach((meal) => (
			mealCards.push(
				<Col key={meal.toString()}>
					<Paper zDepth={1} style={{ margin: 12 }}>
						<MealCard meal={{ type: meal }} />
					</Paper>
				</Col>
			)
		))

		return (
			<Grid fluid>
				<Row center="xs">
					<Col xs>
						<AppBar
							title="Let's create a new meal plan"
							showMenuIconButton={false}
						/>
					</Col>
				</Row>
				<Row center="xs">
					<Col xs>
						<TextField
							hintText="e.g. 7 for a week long plan"
							floatingLabelText="How many days are you planning?"
							defaultValue={this.state.length}
							onChange={(_, value) => this.props.updateMealplan({id: this.props.mealplanId, mealplan: {lengthInDays: parseInt(value)}})}
						/>
					</Col>
				</Row>
				<Row center="xs">
					<Col xs>
						<Toolbar>
							<ToolbarGroup firstChild={false}>
								<ToolbarTitle text="Select Participants" />
							</ToolbarGroup>
						</Toolbar>
					</Col>
				</Row>
				<Row center="xs">
					{peopleCards}
				</Row>
				<Row center="xs">
					<Link
						to={"/account/people/add"}
						style={this.state.styles.button}
					>
						<RaisedButton
							label="Create a new Person"
							secondary={true}
							icon={<SvgIconSocialPersonAdd />}
						/>
					</Link>
				</Row>
				<Row center="xs">
					<Col xs>
						<Toolbar>
							<ToolbarGroup firstChild={false}>
								<ToolbarTitle text="Select Meals" />
							</ToolbarGroup>
						</Toolbar>
					</Col>
				</Row>
				<Row center="xs">
					{mealCards}
				</Row>
				<Row center="xs">
					<Link
						to={"/mealplan/recipes"}
						style={this.state.styles.button}
					>
						<RaisedButton
							label="Select Recipes for Mealplan"
							secondary={true}
							icon={<SvgIconCommunicationImportContacts />}
						/>
					</Link>
				</Row>
			</Grid>
		);
	}
}
