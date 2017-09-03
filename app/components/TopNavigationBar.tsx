// Lib Imports
import * as React from 'react';

import AppBar from 'material-ui/AppBar';
import Avatar from 'material-ui/Avatar';
import IconMenu from "material-ui/IconMenu";
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton'
import MenuItem from 'material-ui/MenuItem';
import { Divider } from "material-ui";
import SvgIconPlacesSpa from 'material-ui/svg-icons/places/spa';
import SvgIconActionAccountCircle from 'material-ui/svg-icons/action/account-circle';
import SvgIconNavigationExpandMore from 'material-ui/svg-icons/navigation/expand-more';
import SvgIconNavigationRefresh from 'material-ui/svg-icons/navigation/refresh';
import SvgIconActionHelp from 'material-ui/svg-icons/action/help';
import SvgIconActionPowerSettingsNew from 'material-ui/svg-icons/action/power-settings-new';

// Local Imports
import { Footer } from "./Footer";
const LogoPng = require('../images/logo.png');


interface Props {
	changePage: (path: string) => void;
};

interface State {
	title: String
	styles: {
		title: {
			cursor: String
		}
	}
};

// test

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
			}
		};
	}
	
	/* <IconButton onClick={() => this.props.changePage("/")}>
		<SvgIconPlacesSpa />
	</IconButton> */

	// <FlatButton onClick={() => this.props.changePage("/")}>

	// </FlatButton>

// 	<Avatar
// 	icon={<SvgIconActionAccountCircle />}
// />
// <IconMenu
// 	iconButtonElement={
// 		<IconButton><SvgIconNavigationExpandMore /></IconButton>
// 	}
// 	targetOrigin={{horizontal: 'right', vertical: 'top'}}
// 	anchorOrigin={{horizontal: 'right', vertical: 'top'}}
// >
// 	<MenuItem primaryText="Refresh" leftIcon={<SvgIconNavigationRefresh />}/>
// 	<MenuItem primaryText="Help" leftIcon={<SvgIconActionHelp />}/>
// 	<Divider />
// 	<MenuItem primaryText="Sign out" leftIcon={<SvgIconActionPowerSettingsNew />}/>
// </IconMenu>

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
							<MenuItem primaryText="Refresh" leftIcon={<SvgIconNavigationRefresh />}/>
							<MenuItem primaryText="Help" leftIcon={<SvgIconActionHelp />}/>
							<Divider />
							<MenuItem primaryText="Sign out" leftIcon={<SvgIconActionPowerSettingsNew />}/>
						</IconMenu>
					</div>
				}
			/>
		);
	}
}
