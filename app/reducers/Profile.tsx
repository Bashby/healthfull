// Lib Imports
import { reducerWithInitialState } from "typescript-fsa-reducers";
import { v4 as uuidv4 } from 'uuid';

// Local Imports
import { ProfileActionCreators } from "../actions/Profile"

// Profile state interfaces
export interface IProfileState {
	id: string,
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

// interface UILockable {
// 	locked?: boolean
// }

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

	isFetching?: boolean // TODO: HOW CAN I NOT HAVE UI STATE HERE?
};

export const PROFILE_INITIAL_STATE: IProfileState = {
	id: "1", // TODO: This needs to be set by authentication!
	username: undefined,
	emailAddress: undefined,
	people: {
		// "12345": {
		// 	name: "John Doe",
		// },
		// "123456": {
		// 	name: "Ben Cardie",
		// 	dailyCalorieTarget: 2500
		// }
	}
}

export const reducerProfile = reducerWithInitialState(PROFILE_INITIAL_STATE)
	// Add Person
	.case(ProfileActionCreators.addPerson, (state, payload) => {
		// Add
		return {
			...state,
			people: {
				...state.people,
				[payload.id]: payload.person
			}
		};
	})
	// Update Person
	.case(ProfileActionCreators.updatePerson, (state, payload) => {
		let updates = Object.assign({}, payload);
		delete updates.id;
		let existing: Person = state.people[payload.id];
		
		return {
			...state,
			people: {
				...state.people,
				[payload.id]: Object.assign({}, existing, updates as Person)
			}
		}
	})
	// Delete Person
	.case(ProfileActionCreators.removePerson, (state, payload) => {
		let newPeople = Object.assign({}, state.people); // TODO: Is this a proper clone?
		delete newPeople[payload];
		return {
			...state,
			people: newPeople,
		}
	})
	// Update Username
	.case(ProfileActionCreators.updateUsername, (state, payload) => ({
		...state,
		username: payload
	}))
	// Update Email Address
	.case(ProfileActionCreators.updateEmailAddress, (state, payload) => ({
		...state,
		emailAddress: payload
	}))
	// UI Lock Person
	.case(ProfileActionCreators.uiLockPerson, (state, payload) => ({
		...state,
		people: {
			...state.people,
			[payload.id]: {
				...state.people[payload.id],
				isFetching: payload.lock
			}
		}
	}))
	.build();