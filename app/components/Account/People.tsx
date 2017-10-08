// Lib Imports
import * as React from 'react';
import { Grid, Row, Col } from "react-flexbox-grid";
import { Paper, Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui';

// Local Imports
import { PersonCard } from '../PersonCard';
import { Person } from '../../reducers/Profile';

interface Props {
	people: {
		[id: string] : Person
	};
};

interface State {
	styles: {
	}
};

// Account People Component
export class People extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			styles: {
			}
		};
	}

	render() {
		let peopleCards: React.ReactNode[] = [];
		Object.entries(this.props.people).forEach(([id, person]) => (
			peopleCards.push(
				<Col key={id}>
					<Paper zDepth={1} style={{ margin: 12, padding: 5 }}>
						<PersonCard person={person} personId={id} selectable={false} />
					</Paper>
				</Col>
			)
		))
		
		return (
			<Grid fluid>
				<Row center="xs">
					<Col xs>
						<Toolbar>
							<ToolbarGroup firstChild={false}>
								<ToolbarTitle text="People" />
							</ToolbarGroup>
						</Toolbar>
					</Col>
				</Row>
				<Row center="xs">
					{peopleCards}
				</Row>
			</Grid>
		);
	}
}
