// Lib Imports
import * as React from 'react';
import { Grid, Row, Col } from "react-flexbox-grid";
import { Link } from "react-router-dom";
import { ActionCreator } from "typescript-fsa/lib";

import { TextField, AppBar, Paper, Checkbox, IconButton, FlatButton, Avatar } from "material-ui";
import { grey600 } from "material-ui/styles/colors";
import SvgIconEditorModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import SvgIconActionInfoOutline from 'material-ui/svg-icons/action/info-outline';
import SvgIconActionReportProblem from 'material-ui/svg-icons/action/report-problem';

// Local Imports
import { Person } from "../reducers/Profile";

interface Props {
	person: Person
	personId: string
	selectable: boolean
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
			marginLeft: number,
		}
		tooltipIcon: {
			cursor: string
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
					marginLeft: 0,
				},
				tooltipIcon: {
					// margin: 0,
					cursor: "help",
					// color: grey600,
					// fontStyle: "italic"
				}
			}
		};
	}

	render() {
		let flavorText: string = this.props.person.dailyCalorieTarget
			? "Calorie Target: " + this.props.person.dailyCalorieTarget
			: "You have not finished editing " + this.props.person.name
		
		return (
			<Grid fluid>
				<Row center="xs" middle="xs">
					<Col xs={3}>
						<Avatar>{this.props.person.name.charAt(0)}</Avatar>
					</Col>
					<Col xs={3}>
						{this.props.selectable
							? <Checkbox
								label={this.props.person.name}
								disabled={this.props.person.dailyCalorieTarget ? false : true}
								style={this.state.styles.checkbox}
							/>
							: <div><span>{this.props.person.name}</span></div>
						}
					</Col>
					<Col xs={3}>
						<IconButton tooltip={flavorText} style={this.state.styles.tooltipIcon} disableTouchRipple={true}>
							{this.props.person.dailyCalorieTarget ? <SvgIconActionInfoOutline /> : <SvgIconActionReportProblem />}
						</IconButton>
					</Col>
					<Col xs={3}>
						<Link to={"/account/people/" + this.props.personId}>
							<IconButton tooltip={"Edit " + this.props.person.name}>
								<SvgIconEditorModeEdit />
							</IconButton>
						</Link>
					</Col>
				</Row>
			</Grid>
		);
	}
}
