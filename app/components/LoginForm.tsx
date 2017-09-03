// Lib Imports
import * as React from 'react';
import { TextField, Paper, RaisedButton, FlatButton, Chip, Avatar } from "material-ui";
import { Grid, Row, Col } from "react-flexbox-grid";
import SvgIconCommunicationVpnKey from 'material-ui/svg-icons/communication/vpn-key';
import SvgIconPlacesSpa from 'material-ui/svg-icons/places/spa';
import SvgIconAlertError from 'material-ui/svg-icons/alert/error';
import { red500, red100, white, red400 } from "material-ui/styles/colors";

// Local Imports


interface Props {
	authenticated: boolean,
	target?: string,
};

interface State {
	styles: {
		button: {
			margin: number,
		},
		lowerPaper: {
			marginTop: number,
		},
		chip: {
			margin: number,
			display: string

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
				lowerPaper: {
					marginTop: 12,
				},
				chip: {
					margin: 12,
					display: "inline-flex" // workaround: let's the darn chip be centered!
				},
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
							<span>You must log in before viewing {this.targetStringClean}</span>
						</Chip>
					</Col>
				</Row>}
				<Paper zDepth={1}>
					<Row center="xs">
						<Col xs>
							<TextField
								hintText="e.g. johndoe@example.com"
								floatingLabelText="Username"
							/>
						</Col>
					</Row>
					<Row center="xs">
						<Col xs>
							<TextField
								hintText="Keep it secret! Keep it safe!"
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
							/>
							<FlatButton label="Forgot password?" />
						</Col>
					</Row>
				</Paper>
				<Paper zDepth={1} style={this.state.styles.lowerPaper}>
					<Row center="xs">
						<Col xs>
							<span>New to Healthfull?</span>
							<RaisedButton
								label="Create an account"
								primary={true}
								style={this.state.styles.button}
								icon={<SvgIconPlacesSpa />}
							/>
						</Col>
					</Row>
				</Paper>
			</Grid>
		);
	}
}
