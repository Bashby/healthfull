// Lib Imports
import * as React from 'react';
import * as History from 'history';

import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { Grid, Col, Row } from "react-flexbox-grid";

// Local Imports
import { IState } from '../reducers/Root';


// Interfaces
interface AllProps extends MyStateProps, MyDispatchProps, MyOwnProps {}

interface State {
	styles: {
	}
}

interface MyStateProps {
}

interface MyDispatchProps {
}

interface MyOwnProps {
	location: History.Location
}

// Mealplan Component
class MealplanComponent extends React.Component<AllProps, State> {
	constructor(props: AllProps) {
		super(props);
		this.state = {
			styles: {
			}
		};
	}
	
	render() {
		return (
			<Grid fluid>
				<Row center="xs">
					<Col xs>
						<span>This is the Mealplan page.</span>
					</Col>
				</Row>
			</Grid>
		);
	}
}

function mapStateToProps(state: IState): MyStateProps {
	return {
	}
}

function mapDispatchToProps(dispatch: Dispatch<IState>): MyDispatchProps {
	return {
	}
}

export const MealplanContainer = connect<MyStateProps, MyDispatchProps, MyOwnProps>(
	mapStateToProps,
	mapDispatchToProps
)(MealplanComponent);
