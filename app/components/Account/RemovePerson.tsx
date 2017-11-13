// Lib Imports
import * as React from 'react';
import { Grid, Row, Col } from "react-flexbox-grid";
import { Link } from 'react-router-dom';
import { Paper, Toolbar, ToolbarGroup, ToolbarTitle, Dialog, FlatButton, TextField } from 'material-ui';

// Local Imports
import { PersonCard } from '../PersonCard';
import { Person } from '../../reducers/Profile';


interface Props {
	person: Person;
	removePerson: () => void;
	handleModalDialogClose: () => void;
};

interface State {
	open: boolean,
	styles: {
		informationText: {
			margin: number
		}
	}
};

// Account RemovePerson Component
export class RemovePerson extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			open: true,
			styles: {
				informationText: {
					margin: 12,
				}
			}
		};
	}

	handleOpen = () => {
		this.setState({ open: true });
	};

	handleClose = (saveChanges: boolean) => {
		this.setState({ open: false });
		if (saveChanges) {
			this.props.removePerson();
		}
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
					label="Remove Person"
					primary={true}
					keyboardFocused={true}
					onClick={() => this.handleClose(true)}
				/>
			</Link>,
		];

		return (
			<Dialog
				title={"Remove " + this.props.person.name + "?"}
				actions={actions}
				modal={false}
				open={this.state.open}
				onRequestClose={(buttonClicked: boolean) => {this.props.handleModalDialogClose(); this.handleClose(false);}}
			>
				<Grid fluid>
					<Row center="xs">
						<Col xs>
							<div style={this.state.styles.informationText}><span>Please confirm you want to remove {this.props.person.name} from your account.</span></div>
						</Col>
					</Row>
				</Grid>
			</Dialog>
		);
	}
}
