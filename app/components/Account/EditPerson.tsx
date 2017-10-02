// Lib Imports
import * as React from 'react';
import { Grid, Row, Col } from "react-flexbox-grid";
import { Paper, Toolbar, ToolbarGroup, ToolbarTitle, Dialog, FlatButton } from 'material-ui';

// Local Imports
import { PersonCard } from '../PersonCard';
import { Person } from '../../reducers/Profile';
import { Link } from 'react-router-dom';

interface Props {
	person: Person;
};

interface State {
	open: boolean,
	styles: {
	}
};

// Account EditPerson Component
export class EditPerson extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			open: true,
			styles: {
			}
		};
	}

	handleOpen = () => {
		this.setState({ open: true });
	};

	handleClose = (saveChanges: boolean) => {
		this.setState({ open: false });
		console.log("Yo?");
	};

	render() {
		// Define modal actions
		const actions = [
			<Link to="/account/people">
				<FlatButton
					label="Cancel"
					primary={true}
					onClick={() => this.handleClose(false)}
				/>
			</Link>,
			<Link to="/account/people">
				<FlatButton
					label="Save Changes"
					primary={true}
					keyboardFocused={true}
					onClick={() => this.handleClose(true)}
				/>
			</Link>,
		];

		return (
			<Dialog
				title={"Edit " + this.props.person.name}
				actions={actions}
				modal={false}
				open={this.state.open}
				onRequestClose={this.handleClose}
			>
				This is where we edit things!
			</Dialog>
		);
	}
}
