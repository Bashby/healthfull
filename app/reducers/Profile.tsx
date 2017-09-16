// Lib Imports
import { reducerWithInitialState } from "typescript-fsa-reducers";
import { v4 as uuidv4 } from 'uuid';

// Local Imports
import { ProfileActionCreators } from "../actions/Profile"

// Profile state interfaces
export interface IProfileState {
	username: string,
	emailAddress: string,
	people: {
		[id: string] : Person
	}
};

export type ValueAndUnit<Unit> = {
	value: number,
	unit: Unit
}

export enum BodyWeightUnit {
	Kilograms,
	Pounds
};

export enum BodyHeightUnit {
	Meters,
	Feet
};

export enum BodyGender {
	Male,
	Female
};

export type Person = {
	name: string
	weight?: ValueAndUnit<BodyWeightUnit>
	goalWeight?: ValueAndUnit<BodyWeightUnit>
	age?: number
	height?: ValueAndUnit<BodyHeightUnit>
	gender?: BodyGender
	activityFrequency?: number
	activityLength?: number
	dailyCalorieTarget?: number
};

export const PROFILE_INITIAL_STATE: IProfileState = {
	username: undefined,
	emailAddress: undefined,
	people: {
		"12345": {
			name: "John Doe",
		},
		"123456": {
			name: "Ben Cardie",
			dailyCalorieTarget: 2500
		}
	}
}

export const reducerProfile = reducerWithInitialState(PROFILE_INITIAL_STATE)
	.case(ProfileActionCreators.addPerson, (state, payload) => {
		// Generate UUID
		let newId = uuidv4();
		
		// Add
		return {
			...state,
			people: {
				...state.people,
				[newId]: payload
			}
		};
	})
	.case(ProfileActionCreators.updatePerson, (state, payload) => ({
		//Update
		...state,
		people: {
			...state.people,
			[payload.id]: Object.assign(state.people[payload.id], payload)
		}
	}))
	.case(ProfileActionCreators.removePerson, (state, payload) => {
		// Remove
		let newPeople = state.people; // TODO: Is this a proper clone?
		delete newPeople[payload];
		
		return {
			...state,
			people: newPeople,
		}
	})
	.case(ProfileActionCreators.updateUsername, (state, payload) => ({
		...state,
		username: payload
	}))
	.build();