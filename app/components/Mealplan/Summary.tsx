// Lib Imports
import * as React from 'react';
import { Grid, Row, Col } from "react-flexbox-grid";
import { Mealplan } from "../../reducers/Mealplan";

// Local Imports

interface Props {
	mealplan: Mealplan;
};

interface State {
	styles: {
	}
};

// Mealplan Summary Component
export class MealplanSummary extends React.Component<Props, State> {
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
						This is the meal plan summary page. This is only shown if you have an active meal plan.
					</Col>
				</Row>
			</Grid>
		);
	}
}
