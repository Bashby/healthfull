// Lib Imports
import actionCreatorFactory from 'typescript-fsa';
import { bindThunkAction } from 'typescript-fsa-redux-thunk';
import { v4 as uuidv4 } from 'uuid';

// Local Imports
import { Person, ValueAndUnit, BodyWeightUnit, BodyGender, BodyHeightUnit } from "../reducers/Profile";
import { IState } from '../reducers/Root';
import { BackendSingleton as Backend } from '../api/backend';
import { Participant } from '../api/api';

// Prepare action creator
const actionCreatorProfile = actionCreatorFactory("Profile");

// Action Payload Generic Types
export type AddPersonPayload = {
	id: string,
	person: Person
}

export type UpdatePersonPayload = {
	id: string
	name?: string
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

// export interface UpdatePersonPayload extends UpdatePersonPayloadBase {
// 	id: string,
// };

export type HydrateProfileParameter = {
	id: string
}

export type HydrateProfileResult = {
	username: string,
	emailAddress: string,
	people: {
		[id: string]: Person,
	}
}

export type UILockPersonPayload = {
	id: string,
	lock: boolean
}

// Create Actions
const UpdateUsername = actionCreatorProfile<string>('UPDATE_USERNAME');
const UpdateEmailAddress = actionCreatorProfile<string>('UPDATE_EMAIL_ADDRESS');
const HydrateProfile = actionCreatorProfile.async<
	IState,
	HydrateProfileParameter,
	HydrateProfileResult,
	Error
	>('HYDRATE_PROFILE');
const AddPerson = actionCreatorProfile<AddPersonPayload>('ADD_PERSON');
const AddPersonAsync = actionCreatorProfile.async<
	IState,
	Person,
	boolean,
	Error
	>('ADD_PERSON_ASYNC');
const UpdatePerson = actionCreatorProfile<UpdatePersonPayload>('UPDATE_PERSON');
const UpdatePersonAsync = actionCreatorProfile.async<
	IState,
	UpdatePersonPayload,
	boolean,
	Error
	>('UPDATE_PERSON_ASYNC');
const RemovePerson = actionCreatorProfile<string>('REMOVE_PERSON');
const RemovePersonAsync = actionCreatorProfile.async<
	IState,
	string,
	boolean,
	Error
	>('REMOVE_PERSON_ASYNC');
const UILockPerson = actionCreatorProfile<UILockPersonPayload>('UI_LOCK_PERSON');

// Thunks
const HydrateProfileWorker = bindThunkAction(HydrateProfile,
	async (params, dispatch, getState, extraArg) => {
		let success: boolean = false;
		let response: HydrateProfileResult = {
			username: undefined,
			emailAddress: undefined,
			people: {}
		};

		// Make request to backend
		await Backend.api.accountIdGet(params.id)
			.then((payload) => {
				success = payload.body.success;
				response.username = payload.body.account.username;
				response.emailAddress = payload.body.account.email;
				payload.body.account.participants.forEach((participant) => {
					response.people[participant.id] = { name: participant.name, dailyCalorieTarget: participant.kcal }
				})
			})
			.catch((e) => console.error("Hydrate Profile Request Failed with: " + e));

		// Successful Authentication
		if (success) {
			// Update profile information
			dispatch(UpdateEmailAddress(response.emailAddress))
			dispatch(UpdateUsername(response.username))
			Object.entries(response.people).forEach(([id, person]) => {
				dispatch(UpdatePerson({id: id, ...person}))
			})
		}

		return response;
	}
);

const AddPersonWorker = bindThunkAction(AddPersonAsync,
	async (params, dispatch, getState, extraArg) => {
		let success: boolean = false;
		let resultParticipant: Participant = undefined;
		let profileId: string = getState().profileState.id;
		let newPersonId: string = uuidv4().replace(new RegExp('-', 'g'), '');

		// Prepare new backend "Participant" from frontend "Person"
		// TODO: Make this cover the whole object and not just name and cal target
		let newParticipant: Participant = {
			id: newPersonId,
			name: params.name,
			kcal: params.dailyCalorieTarget,
			tdee: { // TODO: Remove these placeholders
				sex: "MALE",
				age: 100,
				height: 100,
				weight: 100,
				bmr: 100,
				activity: "something",
				targetWeight: 100,
				targetKCal: 100
			},
			enabled: false
		}
		
		// Make request to backend
		// NOTE: TODO: Stop using this endpoint for creation. Use a POST endpoint.
		await Backend.api.accountIdParticipantsPartIdPut(profileId, newPersonId, newParticipant)
			.then((payload) => {
				success = payload.body.success;
				resultParticipant = payload.body.participant;
			})
			.catch((e) => console.error("Account Participant \"POST\" Request Failed with: " + e));

		// Update Success
		if (success) {
			// Update person
			dispatch(AddPerson({
				id: newPersonId,
				person: {
					name: resultParticipant.name,
					dailyCalorieTarget: resultParticipant.kcal
				}
			}))
		}

		return success;
	}
);

const UpdatePersonWorker = bindThunkAction(UpdatePersonAsync,
	async (params, dispatch, getState, extraArg) => {
		// Lock person while editing
		dispatch(UILockPerson({id: params.id, lock: true}))

		let success: boolean = false;
		let result: Participant = undefined;
		let profileId: string = getState().profileState.id;
		// let existing: Person = getState().profileState.people[params.id];
		let changes: Participant = {
			id: params.id,
			name: params.name,
			kcal: params.dailyCalorieTarget,
			tdee: { // TODO: Remove these placeholders
				sex: "MALE",
				age: 100,
				height: 100,
				weight: 100,
				bmr: 100,
				activity: "something",
				targetWeight: 100,
				targetKCal: 100
			},
			enabled: true
		}
		
		// Make request to backend
		await Backend.api.accountIdParticipantsPartIdPut(profileId, params.id, changes)
			.then((payload) => {
				success = payload.body.success;
				result = payload.body.participant;
			})
			.catch((e) => console.error("Account Participant PUT Request Failed with: " + e));

		// Update Success
		if (success) {
			// Update person
			dispatch(UpdatePerson({id: result.id, name: result.name, dailyCalorieTarget: result.kcal, isFetching: false}))
		}

		return success;
	}
);

const RemovePersonWorker = bindThunkAction(RemovePersonAsync,
	async (params, dispatch, getState, extraArg) => {
		// Lock person while removing
		dispatch(UILockPerson({id: params, lock: true}))

		let success: boolean = false;
		let profileId: string = getState().profileState.id;
		
		// Make request to backend
		await Backend.api.accountIdParticipantsPartIdDelete(profileId, params)
			.then((payload) => {
				success = payload.body.success;
			})
			.catch((e) => console.error("Account Participant DELETE Request Failed with: " + e));

		// Delete Success
		if (success) {
			// Remove person
			dispatch(RemovePerson(params))
		}

		return success;
	}
);

// Bundle and export action creators
export const ProfileActionCreators = {
	updateUsername: UpdateUsername,
	updateEmailAddress: UpdateEmailAddress,
	addPerson: AddPerson,
	addPersonAsync: AddPersonWorker,
	updatePersonAsync: UpdatePersonWorker,
	updatePerson: UpdatePerson,
	removePersonAsync: RemovePersonWorker,
	removePerson: RemovePerson,
	hydrateProfile: HydrateProfileWorker,
	uiLockPerson: UILockPerson
};
