// Lib Imports
import * as React from 'react';

// Local Imports


interface Props {
	title: string;
	description: string;
};

interface State {

};

// Todo Component
export class Todo extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {};
	}
	
	render() {
		return (
			<li>
				<span>{this.props.title}</span>
				<p>{this.props.description}</p>
			</li>
		);
	}
}
