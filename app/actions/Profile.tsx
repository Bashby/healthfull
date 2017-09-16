// Lib Imports
import actionCreatorFactory from 'typescript-fsa';

// Local Imports
import { Person, ValueAndUnit, BodyWeightUnit, BodyGender, BodyHeightUnit } from "../reducers/Profile";

// Prepare action creator
const actionCreatorProfile = actionCreatorFactory("Profile");

// Action Payload Generic Types
type UpdatePersonPayload = {
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

// Create Actions
const UpdateUsername = actionCreatorProfile<string>('UPDATE_USERNAME');
const AddPerson = actionCreatorProfile<Person>('ADD_PERSON');
const UpdatePerson = actionCreatorProfile<UpdatePersonPayload>('UPDATE_PERSON');
const RemovePerson = actionCreatorProfile<string>('REMOVE_PERSON');

// Bundle and export action creators
export const ProfileActionCreators = {
	updateUsername: UpdateUsername,
	addPerson: AddPerson,
	updatePerson: UpdatePerson,
	removePerson: RemovePerson
};
