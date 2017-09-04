// Lib Imports
import * as React from 'react';
import * as History from 'history';

import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { Grid, Col, Row } from "react-flexbox-grid";

import { Chip, Avatar } from "material-ui";
import { yellow400, white, yellow100, yellow600, yellow800, yellow500, black, yellow900 } from "material-ui/styles/colors";
import SvgIconAlertErrorOutline from 'material-ui/svg-icons/alert/error-outline';

// Local Imports
import { IState } from '../reducers/Root';


// Interfaces
interface AllProps extends MyStateProps, MyDispatchProps, MyOwnProps {}

interface State {
	showNotificationChip: boolean
	styles: {
		chip: {
			margin: number,
			display: string,
		}
	}
}

interface MyStateProps {
}

interface MyDispatchProps {
}

interface MyOwnProps {
	location: History.Location
}

// Landing Component
class LandingComponent extends React.Component<AllProps, State> {
	constructor(props: AllProps) {
		super(props);
		this.state = {
			showNotificationChip: true,
			styles: {
				chip: {
					margin: 12,
					display: "inline-flex"
				},
			}
		};
	}
	
	render() {
		return (
			<Grid fluid>
				{this.state.showNotificationChip && this.props.location.state && this.props.location.state.signedOut && <Row center="xs">
					<Col xs>
						<Chip
							backgroundColor={yellow500}
							style={this.state.styles.chip}
							onRequestDelete={() => this.setState({showNotificationChip: false})}
						>
							<Avatar color={yellow900} icon={<SvgIconAlertErrorOutline />} backgroundColor={yellow500}/>
							<span>You have successfully been logged out.</span>
						</Chip>
					</Col>
				</Row>}
				<Row center="xs">
					<Col xs>
						<span>This is the Landing page. Healthy eating, yo.</span>
						<Link to={"/recipes"}>Recipes</Link>
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

export const LandingContainer = connect<MyStateProps, MyDispatchProps, MyOwnProps>(
	mapStateToProps,
	mapDispatchToProps
)(LandingComponent);
