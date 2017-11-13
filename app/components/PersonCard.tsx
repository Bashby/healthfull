// Lib Imports
import * as React from 'react';
import { Grid, Row, Col } from "react-flexbox-grid";
import { Link } from "react-router-dom";
import { ActionCreator } from "typescript-fsa/lib";

import { TextField, AppBar, Paper, Checkbox, IconButton, FlatButton, Avatar, IconMenu, MenuItem, RefreshIndicator } from "material-ui";
import { grey600 } from "material-ui/styles/colors";
import SvgIconEditorModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import SvgIconActionInfoOutline from 'material-ui/svg-icons/action/info-outline';
import SvgIconActionReportProblem from 'material-ui/svg-icons/action/report-problem';
import SvgIconActionDeleteForever from 'material-ui/svg-icons/action/delete-forever';
import SvgIconNavigationMoreVert from 'material-ui/svg-icons/navigation/more-vert';

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
		flavorText: {
			color: string,
			fontStyle: "italic" // Hack
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
					cursor: "help",
				},
				flavorText: {
					color: grey600,
					fontStyle: "italic"
				}
			}
		};
	}

	render() {
		let UiLocked: boolean = this.props.person.isFetching;
		let flavorText: string = this.props.person.dailyCalorieTarget
			? this.props.person.dailyCalorieTarget + " cal."
			: "You have not finished editing " + this.props.person.name
		
		return (
			<Row center="xs" middle="xs">
				<Col xs={2}>
					{UiLocked ? <RefreshIndicator
						left={0}
						top={0}
						status={"loading"}
						style={{"position": "relative"}}
					/> : <Avatar>{this.props.person.name ? this.props.person.name.charAt(0).toUpperCase() : '?'}</Avatar>}
				</Col>
				<Col xs={5}>
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
					{this.props.person.dailyCalorieTarget
						? <div style={this.state.styles.flavorText}><span>{flavorText}</span></div>
						: <IconButton tooltip={flavorText} style={this.state.styles.tooltipIcon} disableTouchRipple={true}>
							<SvgIconActionReportProblem />
						</IconButton>}
				</Col>
				<Col xs={2}>
					<IconMenu
						iconButtonElement={<IconButton><SvgIconNavigationMoreVert /></IconButton>}
						anchorOrigin={{horizontal: 'left', vertical: 'top'}}
						targetOrigin={{horizontal: 'left', vertical: 'top'}}
					>
						<MenuItem
							primaryText="Edit Person"
							leftIcon={<SvgIconEditorModeEdit />}
							containerElement={
								<Link to={{
									pathname: "/account/people/" + this.props.personId,
									search: "?action=edit",
								}} />
							}
						/>
						<MenuItem
							primaryText="Delete Person"
							leftIcon={<SvgIconActionDeleteForever />}
							containerElement={
								<Link to={{
									pathname: "/account/people/" + this.props.personId,
									search: "?action=delete",
								}} />
							}
						/>
					</IconMenu>
				</Col>
			</Row>
		);
	}
}
