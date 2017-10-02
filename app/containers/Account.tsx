// Lib Imports
import * as React from 'react';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";

// Local Imports
import { IState } from '../reducers/Root';
import { RootActionCreators } from "../actions/Root";
import { Summary } from '../components/Account/Summary';
import { People } from '../components/Account/People';
import { Person } from '../reducers/Profile';
import { EditPerson } from '../components/Account/EditPerson';
import { ProfileActionCreators, HydrateProfileParameter, HydrateProfileResult, UpdatePersonPayload } from '../actions/Profile';
import { ThunkAction } from 'redux-thunk';


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
	updatePersonAsync: (params: UpdatePersonPayload) => ThunkAction<Promise<boolean>, IState, any>;
}

interface MyOwnProps {
	showPeople?: boolean
	id?: string
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
		return (
			<div>
				<Summary username={this.props.username} emailAddress={this.props.emailAddress}/>
				{this.props.showPeople && <People people={this.props.people}/>}
				{this.props.id && <EditPerson person={this.props.people[this.props.id]} updatePerson={(params) => this.props.updatePersonAsync({id: this.props.id, ...params,})} />}
			</div>
		);
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
		updatePersonAsync: bindActionCreators(ProfileActionCreators.updatePersonAsync, dispatch),
	}
}

export const AccountContainer = connect<MyStateProps, MyDispatchProps, MyOwnProps>(
	mapStateToProps,
	mapDispatchToProps
)(AccountComponent);
