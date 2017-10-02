// Lib Imports
import * as React from 'react';
import { Row, Col, Grid } from "react-flexbox-grid";
import { ActionCreator } from "typescript-fsa/lib";
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui';

// Local Imports

interface Props {
};

interface State {
	styles: {
	}
};

// Account Summary Component
export class Summary extends React.Component<Props, State> {
	constructor(props: Props) {
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
						<Toolbar>
							<ToolbarGroup firstChild={false}>
								<ToolbarTitle text="Account" />
							</ToolbarGroup>
						</Toolbar>
					</Col>
				</Row>
				<Row center="xs">
					<Col>
						{/* <span>Username: {this.props.username}</span> */}
					</Col>
					<Col>
						{/* <span>Email Address: {this.props.emailAddress}</span> */}
					</Col>
				</Row>
			</Grid>
		);
	}
}
