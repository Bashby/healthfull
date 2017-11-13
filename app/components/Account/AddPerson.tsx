// Lib Imports
import * as React from 'react';
import { Grid, Row, Col } from "react-flexbox-grid";
import { Link } from 'react-router-dom';
import { Paper, Toolbar, ToolbarGroup, ToolbarTitle, Dialog, FlatButton, TextField } from 'material-ui';

// Local Imports
import { Person } from '../../reducers/Profile';

interface Props {
	handleModalDialogClose: () => void;
	addPerson: (params: {name: string, dailyCalorieTarget: number}) => void;
};

interface State {
	newName?: string,
	newDailyCalorieTarget?: number,
	open: boolean,
	styles: {
	}
};

// Account AddPerson Component
export class AddPerson extends React.Component<Props, State> {
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
			this.props.addPerson({
				name: this.state.newName,
				dailyCalorieTarget: this.state.newDailyCalorieTarget
			});
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
					label="Add"
					primary={true}
					keyboardFocused={true}
					onClick={() => this.handleClose(true)}
				/>
			</Link>,
		];

		return (
			<Dialog
				title={"Add New Person"}
				actions={actions}
				modal={false}
				open={this.state.open}
				onRequestClose={(buttonClicked: boolean) => {this.props.handleModalDialogClose(); this.handleClose(false);}}
			>
				<Grid fluid>
					<Row center="xs">
						<Col xs>
							<TextField
								hintText="e.g. John Doe"
								floatingLabelText="Name"
								onChange={(_, value) => this.setState({newName: value})}
							/>
						</Col>
					</Row>
					<Row center="xs">
						<Col xs>
							<TextField
								hintText="e.g. 2000"
								floatingLabelText="Daily Calorie Target"
								onChange={(_, value) => this.setState({newDailyCalorieTarget: parseInt(value)})}
							/>
						</Col>
					</Row>
				</Grid>
			</Dialog>
		);
	}
}
