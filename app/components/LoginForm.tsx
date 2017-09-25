// Lib Imports
import * as React from 'react';
import { ActionCreator } from "typescript-fsa/lib";
import { ThunkAction } from 'redux-thunk';
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import { Grid, Row, Col } from "react-flexbox-grid";

import { TextField, Paper, RaisedButton, FlatButton, Chip, Avatar, AppBar } from "material-ui";
import SvgIconCommunicationVpnKey from 'material-ui/svg-icons/communication/vpn-key';
import SvgIconPlacesSpa from 'material-ui/svg-icons/places/spa';
import SvgIconAlertError from 'material-ui/svg-icons/alert/error';
import { red500, red100, white, red400, grey200, grey700 } from "material-ui/styles/colors";
import { AuthenticationBasicParameter } from '../actions/Authentication';
import { IState } from '../reducers/Root';


// Local Imports


interface Props {
	authenticated: boolean
	changePage: (path: string) => void
	//updateAuthenticated: ActionCreator<boolean>
	username: string
	//updateUsername: ActionCreator<string>
	target?: string
	authenticate: (params: AuthenticationBasicParameter) => ThunkAction<Promise<{ success: boolean; }>, IState, any>;
};

interface State {
	username?: string
	password?: string
	styles: {
		button: {
			margin: number
		},
		paper: {
			marginTop: number
		},
		chip: {
			margin: number
			display: string
		},
		flavorText: {
			margin: number
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
								defaultValue={this.props.username}
								onChange={(_, value) => this.setState({username: value})}
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
							{/* <Link to={this.props.target ? this.props.target : "/mealplan"}> */}
								<RaisedButton
									label="Login"
									secondary={true}
									style={this.state.styles.button}
									icon={<SvgIconCommunicationVpnKey />}
									onClick={() => { this.props.authenticate({username: this.state.username, password: this.state.password})}}
								/>
							{/* </Link> */}
							<Link to={"/forgotpassword"}>
								<FlatButton
									label="Forgot password?"
								/>
							</Link>
						</Col>
					</Row>
				</Paper>
				<Paper zDepth={1} style={this.state.styles.paper}>
					<Row center="xs">
						<Col xs>
							<span style={this.state.styles.flavorText}>New to Healthfull?</span>
							<Link to={"/signup"}>
								<RaisedButton
									label="Create an account"
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
