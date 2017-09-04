// Lib Imports
import * as React from 'react';
import * as History from 'history';
import { ActionCreator } from "typescript-fsa/lib";

import AppBar from 'material-ui/AppBar';
import Avatar from 'material-ui/Avatar';
import IconMenu from "material-ui/IconMenu";
import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/FlatButton'
import MenuItem from 'material-ui/MenuItem';
import { Divider } from "material-ui";
import SvgIconPlacesSpa from 'material-ui/svg-icons/places/spa';
import SvgIconActionAccountCircle from 'material-ui/svg-icons/action/account-circle';
import SvgIconNavigationExpandMore from 'material-ui/svg-icons/navigation/expand-more';
import SvgIconActionFace from 'material-ui/svg-icons/action/face';
import SvgIconActionHelp from 'material-ui/svg-icons/action/help';
import SvgIconActionPowerSettingsNew from 'material-ui/svg-icons/action/power-settings-new';
import { deepOrange500, deepOrange300, deepOrange400, white } from "material-ui/styles/colors";

// Local Imports
const LogoPng = require('../images/logo.png');

interface Props {
	changePage: (path: string, state?: any) => void;
	updateAuthenticated: ActionCreator<boolean>;
	authenticated: boolean;
};

interface State {
	title: string
	styles: {
		title: {
			cursor: string
		},
		getStartedButton: {
			margin: number,
		}
	}
};

const UnauthenticatedMenu = (props: {style: {margin: number}, changePage: (path: string) => void;}) => (
	<RaisedButton
		label="Get Started"
		style={props.style}
		backgroundColor={deepOrange500}
		hoverColor={deepOrange400}
		labelStyle={{color: white}}
		secondary={true}
		icon={<SvgIconPlacesSpa color={white} />}
		onClick={() => props.changePage("/signup")}
	/>
);

const AuthenticatedMenu = (props: {changePage: (path: string, state?: any) => void, updateAuthenticated: ActionCreator<boolean>;}) => (
	<div>
		<Avatar
			icon={<SvgIconActionAccountCircle />}
		/>
		<IconMenu
			iconButtonElement={
				<IconButton><SvgIconNavigationExpandMore /></IconButton>
			}
			targetOrigin={{horizontal: 'right', vertical: 'top'}}
			anchorOrigin={{horizontal: 'right', vertical: 'top'}}
		>
			<MenuItem
				primaryText="Account"
				leftIcon={<SvgIconActionFace />}
				onClick={() => props.changePage("/account")}
			/>
			<MenuItem primaryText="Help" leftIcon={<SvgIconActionHelp />}/>
			<Divider />
			<MenuItem
				primaryText="Sign out"
				leftIcon={<SvgIconActionPowerSettingsNew />}
				onClick={() => (props.changePage("/", { signedOut: true }), props.updateAuthenticated(false))}
			/>
		</IconMenu>
	</div>
);

// TopNavigationBar Component
export class TopNavigationBar extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			title: "Healthfull",
			styles: {
				title: {
					cursor: 'pointer',
				},
				getStartedButton: {
					margin: 5,
				}
			}
		};
	}
	
	render() {
		return (
			<AppBar
				title={<span style={this.state.styles.title}>{this.state.title}</span>}
				onTitleTouchTap={() => this.props.changePage("/")}
				onLeftIconButtonTouchTap={() => this.props.changePage("/")}
				iconElementLeft={
					<div style={this.state.styles.title}>
						<Avatar src={LogoPng} size={48}/>
					</div>
				}
				iconElementRight={
					this.props.authenticated
						? <AuthenticatedMenu changePage={this.props.changePage} updateAuthenticated={this.props.updateAuthenticated} />
						: <UnauthenticatedMenu
							style={this.state.styles.getStartedButton}
							changePage={this.props.changePage}
						/>
				}
			/>
		);
	}
}
