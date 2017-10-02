// Lib Imports
import actionCreatorFactory from 'typescript-fsa';
import { bindThunkAction } from 'typescript-fsa-redux-thunk';

// Local Imports
import { Person, ValueAndUnit, BodyWeightUnit, BodyGender, BodyHeightUnit } from "../reducers/Profile";
import { IState } from '../reducers/Root';
import { BackendSingleton as Backend } from '../api/backend';
import { Participant } from '../api/api';

// Prepare action creator
const actionCreatorProfile = actionCreatorFactory("Profile");

// Action Payload Generic Types
export type UpdatePersonPayload = {
	id: string,
	name?: string
	weight?: ValueAndUnit<BodyWeightUnit>
	goalWeight?: ValueAndUnit<BodyWeightUnit>
	age?: number
	height?: ValueAndUnit<BodyHeightUnit>
	gender?: BodyGender
	activityFrequency?: number
	activityLength?: number
	dailyCalorieTarget?: number
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

// Create Actions
const UpdateUsername = actionCreatorProfile<string>('UPDATE_USERNAME');
const UpdateEmailAddress = actionCreatorProfile<string>('UPDATE_EMAIL_ADDRESS');
const AddPerson = actionCreatorProfile<Person>('ADD_PERSON');
const UpdatePerson = actionCreatorProfile<UpdatePersonPayload>('UPDATE_PERSON');
const RemovePerson = actionCreatorProfile<string>('REMOVE_PERSON');
const HydrateProfile = actionCreatorProfile.async<
	IState,
	HydrateProfileParameter,
	HydrateProfileResult,
	Error
	>('HYDRATE_PROFILE');
const UpdatePersonAsync = actionCreatorProfile.async<
	IState,
	UpdatePersonPayload,
	boolean,
	Error
	>('UPDATE_PERSON_ASYNC');

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
			.error((e) => console.error("Hydrate Profile Request Failed with: " + e));

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
	});

const UpdatePersonWorker = bindThunkAction(UpdatePersonAsync,
		async (params, dispatch, getState, extraArg) => {
			let success: boolean = false;
			let profileId: string = getState().profileState.id;
			// let existing: Person = getState().profileState.people[params.id];
			let changes: Participant = {
				kcal: params.dailyCalorieTarget,
				id: params.id,
				name: params.name,
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
			let result: Participant;

			// Make request to backend
			await Backend.api.accountIdParticipantsPartIdPut(profileId, params.id, changes)
				.then((payload) => {
					success = payload.body.success;
					result = payload.body.participant;
				})
				.error((e) => console.error("Account Participant PUT Request Failed with: " + e));
	
			// Successful Backup Participant Update
			if (success) {
				// Update person
				dispatch(UpdatePerson({id: result.id, name: result.name, dailyCalorieTarget: result.kcal}))
			}
	
			return success;
		});

// Bundle and export action creators
export const ProfileActionCreators = {
	updateUsername: UpdateUsername,
	updateEmailAddress: UpdateEmailAddress,
	addPerson: AddPerson,
	updatePersonAsync: UpdatePersonWorker,
	updatePerson: UpdatePerson,
	removePerson: RemovePerson,
	hydrateProfile: HydrateProfileWorker
};
