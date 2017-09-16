// Lib Imports
import * as React from 'react';
import { Link } from "react-router-dom";
import { ActionCreator } from "typescript-fsa/lib";
import { Grid, Row, Col } from "react-flexbox-grid";

import { TextField, Paper, RaisedButton, FlatButton, Chip, Avatar, AppBar } from "material-ui";
import SvgIconCommunicationVpnKey from 'material-ui/svg-icons/communication/vpn-key';
import SvgIconPlacesSpa from 'material-ui/svg-icons/places/spa';
import SvgIconAlertError from 'material-ui/svg-icons/alert/error';
import { red500, red100, white, red400, grey700, grey600 } from "material-ui/styles/colors";

// Local Imports


interface Props {
	authenticated: boolean,
	changePage: (path: string) => void;
	updateAuthenticated: ActionCreator<boolean>
	username: string
	updateUsername: ActionCreator<string>
	target?: string,
};

interface State {
	username?: string,
	password?: string,
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
		warningtext: {
			margin: number,
			color: string,
			fontStyle: "italic" // hack: not sure what to do with this
		}
	}
};

// SignupForm Form Component
export class SignupForm extends React.Component<Props, State> {
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
				warningtext: {
					margin: 12,
					color: grey600,
					fontStyle: "italic"
				}
			}
		};
	}

	targetStringClean = this.props.target && this.props.target.substr(1);
	
	render() {
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
							<span>You must create an account before viewing {this.targetStringClean}</span>
						</Chip>
					</Col>
				</Row>}
				<Paper zDepth={1} style={this.state.styles.paper}>
					<Row center="xs">
						<Col xs>
							<AppBar
								title="Sign Up"
								showMenuIconButton={false}
							/>
						</Col>
					</Row>
					<Row center="xs">
						<Col xs>
							<TextField
								hintText="e.g. johndoe@example.com"
								floatingLabelText="Email Address"
								defaultValue={this.props.username}
								onChange={(_, value) => this.setState({username: value})}
							/>
						</Col>
					</Row>
					<Row center="xs">
						<Col xs>
							<TextField
								floatingLabelText="Confirm Email Address"
							/>
						</Col>
					</Row>
					<Row center="xs">
						<Col xs>
							<TextField
								floatingLabelText="Password"
								type="password"
								onChange={(_, value) => this.setState({password: value})} // TODO: This might be a security issue?
							/>
						</Col>
					</Row>
					<Row center="xs">
						<Col xs>
							<Link to={this.props.target ? this.props.target : "/mealplan"}>
								<RaisedButton
									label="Create your account"
									secondary={true}
									style={this.state.styles.button}
									icon={<SvgIconCommunicationVpnKey />}
									onClick={() => { this.props.updateAuthenticated(true), this.props.updateUsername(this.state.username)}}
								/>
							</Link>
						</Col>
					</Row>
					<Row center="xs">
						<Col xs>
							<div style={this.state.styles.warningtext}>
								<span>By creating an account, you are agreeing to the <Link to='/termsofservice'>Terms of Service</Link> and the <Link to='/privacypolicy'>Privacy Policy</Link>.</span>
							</div>
						</Col>
					</Row>
				</Paper>
				<Paper zDepth={1} style={this.state.styles.paper}>
					<Row center="xs">
						<Col xs>
							<span>Already have an account?</span>
							<Link to={"/login"}>
								<RaisedButton
									label="Log in"
									style={this.state.styles.button}
									icon={<SvgIconPlacesSpa />}
								/>
							</Link>
						</Col>
					</Row>
				</Paper>
			</Grid>
		);
	}
}
