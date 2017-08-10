// Lib Imports
import * as React from 'react';

// Local Imports


interface Props {
	title: string;
};

interface State {

};

// Title Component
export class Title extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {};
	}
	
	render() {
		return (
			<div>
				<h1>{this.props.title}</h1>
			</div>
		);
	}
}
