// Lib Imports
import * as React from 'react';
import { ActionCreator } from "typescript-fsa/lib";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import { Grid, Row, Col } from "react-flexbox-grid";

import { TextField, Paper, RaisedButton, FlatButton, Chip, Avatar, AppBar } from "material-ui";
import SvgIconCommunicationVpnKey from 'material-ui/svg-icons/communication/vpn-key';
import SvgIconPlacesSpa from 'material-ui/svg-icons/places/spa';
import SvgIconAlertError from 'material-ui/svg-icons/alert/error';
import { red500, red100, white, red400, grey200, grey700 } from "material-ui/styles/colors";


// Local Imports


interface Props {
	authenticated: boolean,
	changePage: (path: string) => void;
	updateAuthenticated: ActionCreator<boolean>;
	target?: string,
};

interface State {
	styles: {
		button: {
			margin: number,
		},
		paper: {
			marginTop: number,
		},
		chip: {
			margin: number,
			display: string
		},
		flavorText: {
			margin: number,
		}
	}
};

// LoginForm Form Component
export class LoginForm extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			styles: {
				button: {
					margin: 12,
				},
				paper: {
					marginTop: 12,
				},
				chip: {
					margin: 12,
					display: "inline-flex" // workaround: let's the darn chip be centered!
				},
				flavorText: {
					margin: 12,
				}
			}
		};
	}

	targetStringClean = this.props.target && this.props.target.substr(1);
	
	render() {
		// Redirect, as applicable
		if (this.props.authenticated && this.props.target) {
			return (
				<Redirect to={this.props.target}/>
			)
		}

		return (
			<Grid fluid>
				{!this.props.authenticated && this.props.target && <Row center="xs">
					<Col xs>
						<Chip
							backgroundColor={red400}
							style={this.state.styles.chip}
							labelColor={white}
						>
							<Avatar color={red100} icon={<SvgIconAlertError />} backgroundColor={red400}/>
							<span>You must log in before viewing {this.targetStringClean}</span>
						</Chip>
					</Col>
				</Row>}
				<Paper zDepth={1} style={this.state.styles.paper}>
					<Row center="xs">
						<Col xs>
							<AppBar
								title="Log In"
								showMenuIconButton={false}
							/>
						</Col>
					</Row>
					<Row center="xs">
						<Col xs>
							<TextField
								hintText="e.g. johndoe@example.com"
								floatingLabelText="Username or Email Address"
							/>
						</Col>
					</Row>
					<Row center="xs">
						<Col xs>
							<TextField
								floatingLabelText="Password"
								type="password"
							/>
						</Col>
					</Row>
					<Row center="xs">
						<Col xs>
							<RaisedButton
								label="Login"
								secondary={true}
								style={this.state.styles.button}
								icon={<SvgIconCommunicationVpnKey />}
								onClick={() => this.props.updateAuthenticated(true)}
							/>
							<FlatButton label="Forgot password?" />
						</Col>
					</Row>
				</Paper>
				<Paper zDepth={1} style={this.state.styles.paper}>
					<Row center="xs">
						<Col xs>
							<span style={this.state.styles.flavorText}>New to Healthfull?</span>
							<RaisedButton
								label="Create an account"
								style={this.state.styles.button}
								icon={<SvgIconPlacesSpa />}
								onClick={() => this.props.changePage("/signup")}
							/>
						</Col>
					</Row>
				</Paper>
			</Grid>
		);
	}
}
