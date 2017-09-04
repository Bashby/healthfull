// Lib Imports
import { reducerWithInitialState } from "typescript-fsa-reducers";
import { v4 as uuidv4 } from 'uuid';

// Local Imports
import { } from "../actions/Mealplan"

// Mealplan state interfaces
export interface IMealplanState {
	activePlan?: string // Mealplan ID for the active meal plan.
	mealplans: Mealplan[]
};

type Mealplan = {
	id: string
	name: string
	startDate: Date
	endDate: Date
	lengthInDays: number
	participants: string[] // Array of Person IDs, refers to people stored on the Profile
	groceryList: GroceryList
	alerts: Alert[]
};

type GroceryList = {
	items: PurchaseableItem[]
};

type PurchaseableItem = {
	name: string,
	amount: number,
	amountUnit: string // TODO: maybe an enum once I know all the units that could be here.
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