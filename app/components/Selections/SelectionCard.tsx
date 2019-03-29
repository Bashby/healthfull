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


interface Props {
	name: string
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

// Mealplan Selection Card Component
export class SelectionCard extends React.Component<Props, State> {
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
		let UiLocked: boolean = false;
		
		return (
			<Row center="xs" middle="xs">
				<Col xs={3}>
					<Avatar>{this.props.name ? this.props.name.charAt(0).toUpperCase() : '?'}</Avatar>
				</Col>
				<Col xs={9}>
					<Checkbox
						label={this.props.name}
						style={this.state.styles.checkbox}
					/>
				</Col>
			</Row>
		);
	}
}
