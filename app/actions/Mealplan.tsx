// Lib Imports
import actionCreatorFactory from 'typescript-fsa';

// Local Imports
import { Mealplan, GroceryList, Alert } from "../reducers/Mealplan";

// Prepare action creator
const actionCreatorMealplan = actionCreatorFactory("Mealplan");

// Action Payload Generic Types
export type UpdateMealplanPayload = {
	id: string
	name?: string
	startDate?: Date
	endDate?: Date
	lengthInDays?: number
	participants?: string[]
	groceryList?: GroceryList
	alerts?: Alert[]
}

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
const UpdateActiveMealplan = actionCreatorMealplan<string>('UPDATE_ACTIVE_MEALPLAN');
const UpdateMealplan = actionCreatorMealplan<UpdateMealplanPayload>('UPDATE_MEALPLAN');
const AddMealplan = actionCreatorMealplan<Mealplan>('ADD_MEALPLAN');
const RemoveMealplan = actionCreatorMealplan<string>('REMOVE_MEALPLAN');

// Bundle and export action creators
export const MealplanActionCreators = {
	updateActiveMealplan: UpdateActiveMealplan,
	updateMealplan: UpdateMealplan,
	addMealplan: AddMealplan,
	removeMealplan: RemoveMealplan
};
