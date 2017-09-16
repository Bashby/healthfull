// Lib Imports
import { reducerWithInitialState } from "typescript-fsa-reducers";
import { v4 as uuidv4 } from 'uuid';

// Local Imports
import { ProfileActionCreators } from "../actions/Profile"

// Profile state interfaces
export interface IProfileState {
	username: string,
	emailAddress: string,
	people: Person[],
};

enum BodyWeightUnit {
	Kilograms,
	Pounds
};

enum BodyHeightUnit {
	Meters,
	Feet
};

enum BodyGender {
	Male,
	Female
};

export type Person = {
	id: string
	name: string
	weight?: number
	weightUnit: BodyWeightUnit
	goalWeight?: number
	goalWeightUnit: BodyWeightUnit
	age?: number
	height?: number
	heightUnit: BodyHeightUnit
	gender?: BodyGender
	activityFrequency?: number
	activityLength?: number
	dailyCalorieTarget?: number
};

export const PROFILE_INITIAL_STATE: IProfileState = {
	username: undefined,
	emailAddress: undefined,
	people: []
}

export const reducerProfile = reducerWithInitialState(PROFILE_INITIAL_STATE)
	.case(ProfileActionCreators.updateUsername, (state, payload) => ({
		...state,
		username: payload
	}))
	.build();