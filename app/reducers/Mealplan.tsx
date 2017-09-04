// Lib Imports
import { reducerWithInitialState } from "typescript-fsa-reducers";
import { v4 as uuidv4 } from 'uuid';

// Local Imports
import { Person } from "./Profile"
import { } from "../actions/Mealplan"

// Mealplan state interfaces
export interface IMealplanState {
	activePlan?: string // ID for the active meal plan.
	mealplans: Mealplan[]
};

type Mealplan = {
	id: string
	name: string
	startDate: Date
	endDate: Date
	lengthInDays: number
	participants: string[] // Array of IDs for participants stored on the profile
	groceryList: GroceryList
	alerts: Alert[]
};

type GroceryList = {

};

type Alert = {
	id: string
	message: string
};

export const MEALPLAN_INITIAL_STATE: IMealplanState = {
	mealplans: []
};

export const reducerMealplan = reducerWithInitialState(MEALPLAN_INITIAL_STATE)
	.build();