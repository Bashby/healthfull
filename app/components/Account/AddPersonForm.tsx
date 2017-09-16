// Lib Imports
import * as React from 'react';
import { Grid, Row, Col } from "react-flexbox-grid";
import { TextField, AppBar, Paper, Checkbox, IconButton, FlatButton } from "material-ui";
import { ActionCreator } from "typescript-fsa/lib";

// Local Imports
import { Link } from "react-router-dom";
import { grey600 } from "material-ui/styles/colors";

interface Props {
};

interface State {
	styles: {
		paper: {
			marginTop: number,
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

// Account Add Person Form Component
export class AddPersonForm extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			styles: {
				paper: {
					marginTop: 0,
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

	render() {
		return (
			<div>
				<Row center="xs">
					<Col xs>
						"yo"
					</Col>
				</Row>
			</div>
		);
	}
}
