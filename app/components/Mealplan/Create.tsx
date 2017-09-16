// Lib Imports
import * as React from 'react';
import { Grid, Row, Col } from "react-flexbox-grid";
import { TextField, AppBar } from "material-ui";
import { ActionCreator } from "typescript-fsa/lib";

// Local Imports
import { Mealplan } from "../../reducers/Mealplan";

interface Props {
	addMealplan: ActionCreator<Mealplan>;
	updateActiveMealplan: ActionCreator<string>;
};

interface State {
	length: number,
	styles: {
	}
};

// Mealplan Create Component
export class MealplanCreate extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			length: 7,
			styles: {
			}
		};
	}

	render() {
		return (
			<Grid fluid>
				<Row>
					<Col>
						<AppBar
							title="Let's create a new meal plan"
							showMenuIconButton={false}
						/>
					</Col>
				</Row>
				<Row center="xs">
					<Col xs>
						<TextField
							hintText="e.g. 7 for a week long plan"
							floatingLabelText="How many days are you planning?"
							defaultValue={this.state.length}
							onChange={(_, value) => this.setState({length: parseInt(value)})}
						/>
					</Col>
				</Row>
			</Grid>
		);
	}
}
