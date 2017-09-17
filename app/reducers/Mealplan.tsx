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
	meals: {
		[id: string] : Meal
	}
	groceryList?: GroceryList
	alerts: {
		[id: string] : Alert
	}
};

export type Meal = {
	type: MealType
	recipe?: string // Recipe ID
}

export enum MealType {
	Breakfast = "Breakfast",
	Lunch = "Lunch",
	Dinner = "Dinner",
	Snack = "Snack",
	// PreWorkout = "Pre-Workout",
	// PostWorkout = "Post-Workout"
}

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
		// Add Mealplan
		return {
			...state,
			mealplans: {
				...state.mealplans,
				[payload.id]: payload.mealplan
			}
		};
	})
	.case(MealplanActionCreators.updateMealplan, (state, payload) => ({
		// Update Mealplan
		...state,
		mealplans: {
			...state.mealplans,
			[payload.id]: Object.assign(state.mealplans[payload.id], payload)
		}
	}))
	.case(MealplanActionCreators.removeMealplan, (state, payload) => {
		// Remove Mealplan
		let newMealplans = state.mealplans;
		delete newMealplans[payload];

		// Blank active plan, if being removed
		let newActiveMealPlan = payload == state.activePlan ? null : state.activePlan
		
		return {
			...state,
			mealplans: newMealplans,
			activePlan: newActiveMealPlan
		}
	})
	.case(MealplanActionCreators.addMealplanParticipant, (state, payload) => {
		// Add Participant
		let newParticipants = state.mealplans[payload.mealplanId].participants.slice()
		newParticipants.push(payload.participant)

		return {
			...state,
			mealplans: {
				...state.mealplans,
				[payload.mealplanId]: {
					...state.mealplans[payload.mealplanId],
					participants: newParticipants
				}
			}
		};
	})
	.case(MealplanActionCreators.removeMealplanParticipant, (state, payload) => {
		// Remove Participant
		let newParticipants = state.mealplans[payload.mealplanId].participants.slice()
		newParticipants = newParticipants.filter(id => id != payload.id)
		
		return {
			...state,
			mealplans: {
				...state.mealplans,
				[payload.mealplanId]: {
					...state.mealplans[payload.mealplanId],
					participants: newParticipants
				}
			}
		};
	})
	.case(MealplanActionCreators.addMealplanMeal, (state, payload) => {
		// Add Meal
		return {
			...state,
			mealplans: {
				...state.mealplans,
				[payload.mealplanId]: {
					...state.mealplans[payload.mealplanId],
					meals: {
						...state.mealplans[payload.mealplanId].meals,
						[payload.id]: payload.meal
					}
				}
			}
		};
	})
	.case(MealplanActionCreators.removeMealplanMeal, (state, payload) => {
		// Remove Meal
		let newMeals = state.mealplans[payload.mealplanId].meals;
		delete newMeals[payload.id];
	
		return {
			...state,
			mealplans: {
				...state.mealplans,
				[payload.mealplanId]: {
					...state.mealplans[payload.mealplanId],
					meals: newMeals
				}
			}
		};
	})
	.case(MealplanActionCreators.addMealplanAlert, (state, payload) => {
		// Add Alert
		return {
			...state,
			mealplans: {
				...state.mealplans,
				[payload.mealplanId]: {
					...state.mealplans[payload.mealplanId],
					alerts: {
						...state.mealplans[payload.mealplanId].alerts,
						[payload.id]: payload.alert
					}
				}
			}
		};
	})
	.case(MealplanActionCreators.removeMealplanAlert, (state, payload) => {
		// Remove Alert
		let newAlerts = state.mealplans[payload.mealplanId].alerts;
		delete newAlerts[payload.id];
	
		return {
			...state,
			mealplans: {
				...state.mealplans,
				[payload.mealplanId]: {
					...state.mealplans[payload.mealplanId],
					alerts: newAlerts
				}
			}
		};
	})
	.case(MealplanActionCreators.updateActiveMealplan, (state, payload) => ({
		...state,
		activePlan: payload
	}))
	.build();