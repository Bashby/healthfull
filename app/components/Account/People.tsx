// Lib Imports
import * as React from 'react';
import { Grid, Row, Col } from "react-flexbox-grid";
import { Paper, Toolbar, ToolbarGroup, ToolbarTitle, RaisedButton } from 'material-ui';
import SvgIconSocialPersonAdd from 'material-ui/svg-icons/social/person-add';

// Local Imports
import { PersonCard } from '../PersonCard';
import { Person } from '../../reducers/Profile';
import { Link } from 'react-router-dom';

interface Props {
	people: {
		[id: string] : Person
	};
};

interface State {
	styles: {
		button: {
			margin: number,
		},
	}
};

// Account People Component
export class People extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			styles: {
				button: {
					margin: 12,
				},
			}
		};
	}

	render() {
		let peopleCards: React.ReactNode[] = [];
		Object.entries(this.props.people).forEach(([id, person]) => {
			return peopleCards.push(
				<Col xs={12} sm={6} md={6} lg={6} key={id}>
					<Paper zDepth={1} style={{ margin: 12, padding: 5 }}>
						<PersonCard person={person} personId={id} selectable={false} />
					</Paper>
				</Col>
			)
		})
		
		return (
			<Grid fluid>
				<Row center="xs">
					<Col xs>
						<Toolbar>
							<ToolbarGroup firstChild={false}>
								<ToolbarTitle text="People" />
							</ToolbarGroup>
							<ToolbarGroup lastChild={true}>
								<Link
									to={{
										pathname: "/account/people",
										search: "?action=add",
									}}
									style={this.state.styles.button}
								>
									<RaisedButton
										label="Create a new Person"
										secondary={true}
										icon={<SvgIconSocialPersonAdd />}
									/>
								</Link>
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
