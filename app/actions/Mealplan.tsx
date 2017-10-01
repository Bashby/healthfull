// Lib Imports
import actionCreatorFactory from 'typescript-fsa';
import { v4 as uuidv4 } from 'uuid';

// Local Imports
import { Mealplan, GroceryList, Alert, Meal } from "../reducers/Mealplan";
import { Dispatch } from "redux";
import { IState } from "../reducers/Root";

// Prepare Action Creator
const actionCreatorMealplan = actionCreatorFactory("Mealplan");

// Action Payload Types
export interface UpdateMealplanPayload {
	id: string
	mealplan: Partial<Mealplan>
}

export type AddMealplanPayload = {
	id: string
	mealplan: Mealplan
}

export type AddMealplanParticipantPayload = {
	mealplanId: string
	id: string
	participant: string // Person ID
}

export type RemoveMealplanParticipantPayload = {
	mealplanId: string
	id: string // Person ID
}

export type AddMealplanMealPayload = {
	mealplanId: string
	id: string
	meal: Meal
}

export type RemoveMealplanMealPayload = {
	mealplanId: string
	id: string // Meal ID
}

export type AddMealplanAlertPayload = {
	mealplanId: string
	id: string
	alert: Alert
}

export type RemoveMealplanAlertPayload = {
	mealplanId: string
	id: string // Alert ID
}

// Create Actions
const UpdateActiveMealplan = actionCreatorMealplan<string>('UPDATE_ACTIVE_MEALPLAN');

const AddMealplan = actionCreatorMealplan<AddMealplanPayload>('ADD_MEALPLAN');
const UpdateMealplan = actionCreatorMealplan<UpdateMealplanPayload>('UPDATE_MEALPLAN');
const RemoveMealplan = actionCreatorMealplan<string>('REMOVE_MEALPLAN');

const AddMealplanParticipant = actionCreatorMealplan<AddMealplanParticipantPayload>('ADD_MEALPLAN_PARTICIPANT');
const RemoveMealplanParticipant = actionCreatorMealplan<RemoveMealplanParticipantPayload>('REMOVE_MEALPLAN_PARTICIPANT');

const AddMealplanMeal = actionCreatorMealplan<AddMealplanMealPayload>('ADD_MEALPLAN_MEAL');
const RemoveMealplanMeal = actionCreatorMealplan<RemoveMealplanMealPayload>('REMOVE_MEALPLAN_MEAL');

const AddMealplanAlert = actionCreatorMealplan<AddMealplanAlertPayload>('ADD_MEALPLAN_ALERT');
const RemoveMealplanAlert = actionCreatorMealplan<RemoveMealplanAlertPayload>('REMOVE_MEALPLAN_ALERT');

// Wrapper functions for intermediate payloads
export const AddMealPlanWrapped = (payload: Mealplan) => AddMealplan({mealplan: payload, id: uuidv4()});
export const AddMealPlanParticipantWrapped = (mealplanId: string, payload: string) => AddMealplanParticipant({mealplanId: mealplanId, participant: payload, id: uuidv4()});
export const AddMealPlanMealWrapped = (mealplanId: string, payload: Meal) => AddMealplanMeal({mealplanId: mealplanId, meal: payload, id: uuidv4()});
export const AddMealPlanAlertWrapped = (mealplanId: string, payload: Alert) => AddMealplanAlert({mealplanId: mealplanId, alert: payload, id: uuidv4()});

// Bundle and export action creators
export const MealplanActionCreators = {
	updateActiveMealplan: UpdateActiveMealplan,
	addMealplan: AddMealplan,
	updateMealplan: UpdateMealplan,
	removeMealplan: RemoveMealplan,
	addMealplanParticipant: AddMealplanParticipant,
	removeMealplanParticipant: RemoveMealplanParticipant,
	addMealplanMeal: AddMealplanMeal,
	removeMealplanMeal: RemoveMealplanMeal,
	addMealplanAlert: AddMealplanAlert,
	removeMealplanAlert: RemoveMealplanAlert,
};
