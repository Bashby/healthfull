// Lib Imports
import * as React from 'react';

import { Paper } from "material-ui";
import BottomNavigation from 'material-ui/BottomNavigation';
import BottomNavigationItem from 'material-ui/BottomNavigation/BottomNavigationItem';
import SvgIconSocialPeople from 'material-ui/svg-icons/social/people';
import SvgIconSocialNotifications from 'material-ui/svg-icons/social/notifications';
import SvgIconMapsLocalGroceryStore from 'material-ui/svg-icons/maps/local-grocery-store';
import SvgIconMapsRestaurantMenu from 'material-ui/svg-icons/maps/restaurant-menu';

// Local Imports
import { Footer } from "./Footer";


interface Props {
	changePage: (path: string) => void;
	initialIndex?: number
};

interface State {
	index: number
};

// BottomNavigationBar Component
export class BottomNavigationBar extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			index: this.props.initialIndex || 0
		};
	}

	select = (index: number) => this.setState({index: index});
	
	render() {
		return (
			<Footer>
				<Paper zDepth={1}>
					<BottomNavigation selectedIndex={this.state.index}>
						<BottomNavigationItem
							label="Meal Plan"
							icon={<SvgIconMapsRestaurantMenu />}
							onClick={() => { this.props.changePage("/mealplan"); this.select(0) }}
						/>
						<BottomNavigationItem
							label="Grocery List"
							icon={<SvgIconMapsLocalGroceryStore />}
							onClick={() => { this.props.changePage("/mealplan/grocerylist"); this.select(1) }}
						/>
						<BottomNavigationItem
							label="Alerts"
							icon={<SvgIconSocialNotifications />}
							onClick={() => { this.props.changePage("/mealplan/alerts"); this.select(2) }}
						/>
						<BottomNavigationItem
							label="People"
							icon={<SvgIconSocialPeople />}
							onClick={() => { this.props.changePage("/account/people"); this.select(3) }}
						/> 
					</BottomNavigation>
				</Paper>
			</Footer>
		);
	}
}
