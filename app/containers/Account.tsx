// Lib Imports
import * as React from 'react';
import * as History from 'history';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";

// Local Imports
import { IState } from '../reducers/Root';
import { RootActionCreators } from "../actions/Root";
import { Summary } from '../components/Account/Summary';
import { People } from '../components/Account/People';
import { Person } from '../reducers/Profile';
import { ProfileActionCreators, HydrateProfileParameter, HydrateProfileResult, UpdatePersonPayload, AddPersonPayload } from '../actions/Profile';
import { ThunkAction } from 'redux-thunk';
import { AddPerson } from '../components/Account/AddPerson';
import { EditPerson } from '../components/Account/EditPerson';
import { RemovePerson } from '../components/Account/RemovePerson';
import { push } from 'react-router-redux';


// Interfaces
interface AllProps extends MyStateProps, MyDispatchProps, MyOwnProps {}

interface State {
}

interface MyStateProps {
	people: {
		[id: string] : Person
	};
	bottomNavigationIndex: number;
	username: string,
	emailAddress: string,
	profileId: string,
	
}

interface MyDispatchProps {
	setBottomNavigation: (index: number) => void;
	hydrateProfile: (params: HydrateProfileParameter) => ThunkAction<Promise<HydrateProfileResult>, IState, any>;
	addPersonAsync: (params: Person) => ThunkAction<Promise<boolean>, IState, any>;
	updatePersonAsync: (params: UpdatePersonPayload) => ThunkAction<Promise<boolean>, IState, any>;
	removePersonAsync: (id: string) => ThunkAction<Promise<boolean>, IState, any>;
	handleModalDialogClose: () => void;
}

interface MyOwnProps {
	showPeople?: boolean
	id?: string
	location: History.Location
}

const BOTTOM_NAVIGATION_INDEX: number = 3;

// Account Component
class AccountComponent extends React.Component<AllProps, State> {
	constructor(props: AllProps) {
		super(props);
		this.state = {};
	}

	componentWillMount() {
		// Ensures bottom navigation matches all pages managed by container
		if (this.props.bottomNavigationIndex != BOTTOM_NAVIGATION_INDEX) {
			this.props.setBottomNavigation(BOTTOM_NAVIGATION_INDEX)
		}
	}

	componentDidMount() {
		// Query backend for account information
		// TODO: Use caching(?) or a one-time-gate so this is not firing for no reason
		this.props.hydrateProfile({id: this.props.profileId});
	}
	
	render() {
		// Parse query params, when provided
		let queryParamAction: string = undefined;
		if (this.props.location && this.props.location.search) {
			let queryParams = new URLSearchParams(this.props.location.search)
			queryParamAction = queryParams.get('action')
		}

		// Determine the modal content
		let modalContent: React.ReactNode = this.determineModalContent(queryParamAction)
		
		return (
			<div>
				<Summary username={this.props.username} emailAddress={this.props.emailAddress}/>
				{this.props.showPeople && <People people={this.props.people}/>}
				{modalContent}
			</div>
		);
	}

	determineModalContent(action: string): React.ReactNode {
		let res: React.ReactNode = undefined;
		switch(action) {
			case "delete": {
				res = <RemovePerson
					person={this.props.people[this.props.id]}
					removePerson={() => this.props.removePersonAsync(this.props.id)}
					handleModalDialogClose={() => {this.props.handleModalDialogClose();}}
				/>
				break;
			}
			case "edit": {
				res = <EditPerson
					person={this.props.people[this.props.id]}
					updatePerson={(params) => this.props.updatePersonAsync({id: this.props.id, ...params,})}
					handleModalDialogClose={() => {this.props.handleModalDialogClose();}}
				/>
				break;
			}
			case "add": {
				res = <AddPerson
					addPerson={(params) => this.props.addPersonAsync({...params,})}
					handleModalDialogClose={() => {this.props.handleModalDialogClose();}}
				/>
				break;
			}
		}
		return res;
	}
}

function mapStateToProps(state: IState): MyStateProps {
	return {
		bottomNavigationIndex: state.rootState.bottomNavigationIndex,
		people: state.profileState.people,
		username: state.profileState.username,
		emailAddress: state.profileState.emailAddress,
		profileId: state.profileState.id
	}
}

function mapDispatchToProps(dispatch: Dispatch<IState>): MyDispatchProps {
	return {
		setBottomNavigation: bindActionCreators(RootActionCreators.updateBottomNavigationIndex, dispatch),
		hydrateProfile: bindActionCreators(ProfileActionCreators.hydrateProfile, dispatch),
		addPersonAsync: bindActionCreators(ProfileActionCreators.addPersonAsync, dispatch),
		updatePersonAsync: bindActionCreators(ProfileActionCreators.updatePersonAsync, dispatch),
		removePersonAsync: bindActionCreators(ProfileActionCreators.removePersonAsync, dispatch),
		handleModalDialogClose: () => {dispatch(push("/account/people"))},
	}
}

export const AccountContainer = connect<MyStateProps, MyDispatchProps, MyOwnProps>(
	mapStateToProps,
	mapDispatchToProps
)(AccountComponent);
