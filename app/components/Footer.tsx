// Lib Imports
import * as React from 'react';

// Local Imports


interface Props {
};

interface State {
};

// Styles
var style = {
	// backgroundColor: "#F8F8F8",
	// borderTop: "1px solid #E7E7E7",
	// textAlign: "center",
	// padding: "20px",
	position: "fixed" as "fixed", // workaround
	left: "0",
	bottom: "0",
	height: "60px",
	width: "100%",
};

var phantom = {
	display: 'block',
	padding: '20px',
	height: '60px',
	width: '100%',
}

// Footer Component
export class Footer extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {};
	}
	
	render() {
		return (
			<div>
				<div style={phantom} />
				<div style={style}>
					{this.props.children}
				</div>
			</div>
		);
	}
}
