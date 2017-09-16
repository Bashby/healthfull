// Lib Imports
import * as React from 'react';
import { Grid, Row, Col } from "react-flexbox-grid";
import { TextField, AppBar, Paper, Checkbox, IconButton, FlatButton } from "material-ui";
import { ActionCreator } from "typescript-fsa/lib";

import SvgIconEditorModeEdit from 'material-ui/svg-icons/editor/mode-edit';

// Local Imports
import { Person } from "../../reducers/Profile";
import { Link } from "react-router-dom";
import { grey600 } from "material-ui/styles/colors";

interface Props {
	person: Person
	personId: string
};

interface State {
	styles: {
		paper: {
			margin: number,
			padding: 5
		}
		checkbox: {
			margin: number,
		}
		button: {
			margin: number,
		}
		flavorText: {
			margin: number,
			color: string,
			fontStyle: "italic" // HACK: :(
		}
	}
};

// Mealplan Person Card Component
export class PersonCard extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			styles: {
				paper: {
					margin: 12,
					padding: 5
				},
				checkbox: {
					margin: 12,
				},
				button: {
					margin: 12,
				},
				flavorText: {
					margin: 12,
					color: grey600,
					fontStyle: "italic"
				}
			}
		};
	}

	render() {
		let flavorText: string = this.props.person.dailyCalorieTarget
			? "Calorie Target: " + this.props.person.dailyCalorieTarget
			: "You have not finished editing " + this.props.person.name + "."
		
		return (
			<Grid fluid>
				<Row center="xs" middle="xs">
					<Col xs={8}>
						<Checkbox
							label={this.props.person.name}
							disabled={this.props.person.dailyCalorieTarget ? false : true}
							style={this.state.styles.checkbox}
						/>
					</Col>
					<Col xs={4}>
						<Link to={"/account/people/" + this.props.personId}>
							<FlatButton icon={<SvgIconEditorModeEdit />} style={this.state.styles.button} />
						</Link>
					</Col>
				</Row>
				<Row center="xs">
					<Col xs={12}>
						<div style={this.state.styles.flavorText}><span>{flavorText}</span></div>
					</Col>
				</Row>
			</Grid>
		);
	}
}
