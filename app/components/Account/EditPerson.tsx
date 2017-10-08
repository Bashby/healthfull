// Lib Imports
import * as React from 'react';
import { Grid, Row, Col } from "react-flexbox-grid";
import { Paper, Toolbar, ToolbarGroup, ToolbarTitle, Dialog, FlatButton, TextField } from 'material-ui';

// Local Imports
import { PersonCard } from '../PersonCard';
import { Person } from '../../reducers/Profile';
import { Link } from 'react-router-dom';

interface Props {
	person: Person;
	updatePerson: (params: {name: string, dailyCalorieTarget: number}) => void;
};

interface State {
	newName?: string,
	newDailyCalorieTarget?: number,
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
		if (saveChanges) {
			this.props.updatePerson({
				name: this.state.newName,
				dailyCalorieTarget: this.state.newDailyCalorieTarget
			})
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
				<Grid fluid>
					<Row center="xs">
						<Col xs>
							<TextField
								hintText="e.g. John Doe"
								floatingLabelText="Name"
								defaultValue={this.props.person.name}
								onChange={(_, value) => this.setState({newName: value})}
							/>
						</Col>
					</Row>
					<Row center="xs">
						<Col xs>
							<TextField
								hintText="e.g. 2000"
								floatingLabelText="Daily Calorie Target"
								defaultValue={this.props.person.dailyCalorieTarget}
								onChange={(_, value) => this.setState({newDailyCalorieTarget: parseInt(value)})}
							/>
						</Col>
					</Row>
				</Grid>
			</Dialog>
		);
	}
}
