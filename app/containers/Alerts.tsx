// Lib Imports
import * as React from 'react';
import * as History from 'history';

import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { Grid, Col, Row } from "react-flexbox-grid";

// Local Imports
import { IState } from '../reducers/Root';
import { RootActionCreators } from "../actions/Root";


// Interfaces
interface AllProps extends MyStateProps, MyDispatchProps, MyOwnProps {}

interface State {
	styles: {
	}
}

interface MyStateProps {
	bottomNavigationIndex: number;
}

interface MyDispatchProps {
	setBottomNavigation: (index: number) => void;
}

interface MyOwnProps {
	location: History.Location
}

const BOTTOM_NAVIGATION_INDEX: number = 2;

// Alerts Component
class AlertsComponent extends React.Component<AllProps, State> {
	constructor(props: AllProps) {
		super(props);
		this.state = {
			styles: {
			}
		};
	}

	componentWillMount() {
		// Ensures bottom navigation matches all pages managed by container
		if (this.props.bottomNavigationIndex != BOTTOM_NAVIGATION_INDEX) {
			this.props.setBottomNavigation(BOTTOM_NAVIGATION_INDEX)
		}
	}
	
	render() {
		return (
			<Grid fluid>
				<Row center="xs">
					<Col xs>
						<span>This is the Alerts page.</span>
					</Col>
				</Row>
			</Grid>
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
		setBottomNavigation: bindActionCreators(RootActionCreators.updateBottomNavigationIndex, dispatch)
	}
}

export const AlertsContainer = connect<MyStateProps, MyDispatchProps, MyOwnProps>(
	mapStateToProps,
	mapDispatchToProps
)(AlertsComponent);
