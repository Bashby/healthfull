// Lib Imports
import actionCreatorFactory from 'typescript-fsa';

// Local Imports
import {  } from "../reducers/Profile";

// Prepare action creator
const actionCreatorProfile = actionCreatorFactory("Profile");

// Action Payload Generic Types
// type AddMealplan = {
// 	name: string
// 	startDate: Date
// 	endDate: Date
// 	lengthInDays: number
// 	participants: string[]
// 	groceryList?: GroceryList
// 	alerts: Alert[]
// }

// Create Actions
const UpdateUsername = actionCreatorProfile<string>('UPDATE_USERNAME');

// Bundle and export action creators
export const ProfileActionCreators = {
	updateUsername: UpdateUsername,
};
