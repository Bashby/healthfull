// Lib Imports
import * as React from 'react';
import { Grid, Row, Col } from "react-flexbox-grid";
import { TextField, AppBar, Paper, Checkbox, IconButton, FlatButton, Card, CardMedia, CardTitle, CardHeader, Avatar } from "material-ui";
import { ActionCreator } from "typescript-fsa/lib";

import SvgIconEditorModeEdit from 'material-ui/svg-icons/editor/mode-edit';

// Local Imports
import { Link } from "react-router-dom";
import { grey600 } from "material-ui/styles/colors";
import { Meal, MealType } from "../../reducers/Mealplan";

interface Props {
	meal: Meal
};

interface State {
	styles: {
		paper: {
			margin: number,
			padding: 5
		}
		checkbox: {
			margin: number,
		}
		button: {
			margin: number,
		}
		flavorText: {
			margin: number,
			color: string,
			fontStyle: "italic" // HACK: :(
		}
	}
};

// Mealplan Meal Card Component
export class MealCard extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			styles: {
				paper: {
					margin: 12,
					padding: 5
				},
				checkbox: {
					margin: 12,
				},
				button: {
					margin: 12,
				},
				flavorText: {
					margin: 12,
					color: grey600,
					fontStyle: "italic"
				}
			}
		};
	}

	pathToImage = require('../../images/' + this.props.meal.type.toLowerCase() + '-default.jpg');

	render() {
		return (
			<Grid fluid>
				<Row center="xs">
					<Col xs>
						<div><span>{this.props.meal.type.toString()}</span></div>
					</Col>
				</Row>
				<Row center="xs">
					<Col xs>
						<img src={this.pathToImage} width={"100px"} />
					</Col>
				</Row>
				<Row center="xs">
					<Col xs>
						<Checkbox label={"Choose"} />
					</Col>
				</Row>
			</Grid>
		);
	}
}
