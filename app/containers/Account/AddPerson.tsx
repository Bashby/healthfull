// Lib Imports
import * as React from 'react';
import * as History from 'history';

import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { Grid, Col, Row } from "react-flexbox-grid";

import SvgIconSocialPersonAdd from 'material-ui/svg-icons/social/person-add';

// Local Imports
import { IState } from '../../reducers/Root';
import { RootActionCreators } from "../../actions/Root";
import { AddPersonForm } from "../../components/Account/AddPersonForm";
import { Paper, AppBar, Tabs, Tab, TextField, RaisedButton, Toolbar, ToolbarGroup, ToolbarTitle } from "material-ui";
import { ActionCreator } from "typescript-fsa/lib";
import { Person } from "../../reducers/Profile";
import { ProfileActionCreators } from "../../actions/Profile";


// Interfaces
interface AllProps extends MyStateProps, MyDispatchProps, MyOwnProps {}

interface State {
	dailyCaloricIntake?: number
	name?: string
	styles: {
		flavorText: {
			margin: number
		}
		button: {
			margin: number
		}
		paper: {
			marginTop: number
		}
	}
}

interface MyStateProps {
	bottomNavigationIndex: number;
}

interface MyDispatchProps {
	setBottomNavigation: (index: number) => void;
	addPersonAsync: (person: Person) => void;
}

interface MyOwnProps {
	location: History.Location
}

const BOTTOM_NAVIGATION_INDEX: number = 3;

// Add Person to Account Component
class AddPersonComponent extends React.Component<AllProps, State> {
	constructor(props: AllProps) {
		super(props);
		this.state = {
			styles: {
				flavorText: {
					margin: 12
				},
				button: {
					margin: 12
				},
				paper: {
					marginTop: 12
				}
			}
		};
	}

	componentWillMount() {
		// Ensures bottom navigation matches all pages managed by container
		if (this.props.bottomNavigationIndex != BOTTOM_NAVIGATION_INDEX) {
			this.props.setBottomNavigation(BOTTOM_NAVIGATION_INDEX)
		}
	}

	handleCreatePerson = () => {
		// Build
		let person: Person = {
			name: this.state.name,
			dailyCalorieTarget: this.state.dailyCaloricIntake
		}

		// Dispatch
		this.props.addPersonAsync(person)
	}
	
	render() {
		return (
			// TODO: Too much presentational layer in this container-layer component.
			<div>
				<Grid fluid>
					{/* <Paper zDepth={1}> */}
						<Row center="xs">
							<Col xs>
								<Toolbar>
									<ToolbarGroup firstChild={false}>
										<ToolbarTitle text="Create Person" />
									</ToolbarGroup>
								</Toolbar>
							</Col>
						</Row>
						<Row center="xs">
							<Col xs={12}>
								<div style={this.state.styles.flavorText}>
									<span>Answer the following questions to create a new Person.</span>
								</div>
							</Col>
							<Col xs={12}>
								<div style={this.state.styles.flavorText}>
									<span>If you prefer, you may manually enter a value for daily caloric intake.</span>
								</div>
							</Col>
						</Row>
						<Row center="xs">
							<Col xs>
								<TextField
									hintText="e.g. John Dough"
									floatingLabelText="Name"
									onChange={(_, value) => this.setState({name: value})}
								/>
							</Col>
						</Row>
						<Row center="xs">
							<Col xs>
								<Tabs>
									<Tab label="Caloric Intake Form">
										<AddPersonForm />
									</Tab>
									<Tab label="Manual">
										<Row center="xs">
											<Col xs>
												<TextField
													hintText="e.g. 2000"
													floatingLabelText="Daily Caloric Intake"
													onChange={(_, value) => this.setState({dailyCaloricIntake: parseInt(value)})}
												/>
											</Col>
										</Row>
									</Tab>
								</Tabs>
							</Col>
						</Row>
					{/* </Paper> */}
					<Paper zDepth={1} style={this.state.styles.paper}>
						<Row center="xs">
							<Col xs>
								<Link to={"/account/people"}>
									<RaisedButton
										label="Create Person"
										style={this.state.styles.button}
										secondary={true}
										icon={<SvgIconSocialPersonAdd />}
										onClick={this.handleCreatePerson}
									/>
								</Link>
							</Col>
						</Row>
					</Paper>
				</Grid>
			</div>
		);
	}
}

function mapStateToProps(state: IState): MyStateProps {
	return {
		bottomNavigationIndex: state.rootState.bottomNavigationIndex
	}
}

function mapDispatchToProps(dispatch: Dispatch<IState>): MyDispatchProps {
	return {
		setBottomNavigation: bindActionCreators(RootActionCreators.updateBottomNavigationIndex, dispatch),
		addPersonAsync: bindActionCreators(ProfileActionCreators.addPersonAsync, dispatch),
	}
}

export const AddPersonContainer = connect<MyStateProps, MyDispatchProps, MyOwnProps>(
	mapStateToProps,
	mapDispatchToProps
)(AddPersonComponent);
