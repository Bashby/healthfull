// Lib Imports
import { reducerWithInitialState } from "typescript-fsa-reducers";
import { v4 as uuidv4 } from 'uuid';

// Local Imports
import { MealplanActionCreators } from "../actions/Mealplan"

// Mealplan state interfaces
export interface IMealplanState {
	activePlan?: string // Mealplan ID for the active meal plan.
	mealplans: {
		[id: string] : Mealplan
	}
};

export type Mealplan = {
	name: string
	startDate: Date
	endDate: Date
	lengthInDays: number
	participants: string[] // Array of Person IDs, refers to people stored on the Profile
	groceryList?: GroceryList
	alerts: Alert[]
};

export type GroceryList = {
	items: PurchaseableItem[]
};

type PurchaseableItem = {
	name: string,
	amount: number,
	amountUnit: string // TODO: maybe an enum once I know all the units that could be here.
};

export type Alert = {
	id: string
	message: string
};

export const MEALPLAN_INITIAL_STATE: IMealplanState = {
	mealplans: {}
};

export const reducerMealplan = reducerWithInitialState(MEALPLAN_INITIAL_STATE)
	.case(MealplanActionCreators.addMealplan, (state, payload) => {
		// Generate UUID
		let newId = uuidv4();
		
		// Add
		return {
			...state,
			mealplans: {
				...state.mealplans,
				[newId]: payload
			}
		};
	})
	.case(MealplanActionCreators.updateMealplan, (state, payload) => ({
		...state,
		mealplans: {
			...state.mealplans,
			[payload.id]: Object.assign(state.mealplans[payload.id], payload)
		}
	}))
	.case(MealplanActionCreators.removeMealplan, (state, payload) => {
		// Remove
		let newMealplans = state.mealplans;
		delete newMealplans[payload];
		
		return {
			...state,
			mealplans: newMealplans,
			activePlan: payload == state.activePlan ? null : state.activePlan
		}
	})
	.case(MealplanActionCreators.updateActiveMealplan, (state, payload) => ({
		...state,
		activePlan: payload
	}))
	.build();