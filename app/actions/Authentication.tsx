// Lib Imports
import actionCreatorFactory from 'typescript-fsa';
import { bindThunkAction } from 'typescript-fsa-redux-thunk';

// Local Imports
import { IState } from '../reducers/Root';
import { BackendSingleton as Backend } from '../api/backend';
import { RootActionCreators } from './Root';

// Prepare action creator
const actionCreatorAuth = actionCreatorFactory("Authentication");

// Action Payload Generic Types
export type AuthenticationBasicParameter = {
	username: string,
	password: string
};
export type AuthenticationBasicPayload = {
	success: boolean
};

// Create Actions
const SetSessionKey = actionCreatorAuth<string>('SET_SESSION_KEY');
const DeleteSessionKey = actionCreatorAuth<void>('DELETE_SESSION_KEY');
const AuthenticateBasic = actionCreatorAuth.async<
	IState,   // redux store state type
	AuthenticationBasicParameter,   // parameter type
	AuthenticationBasicPayload,   // result type
	Error // error type, maybe customize this?
	>('AUTHENTICATE_BASIC');

// Thunks
const authenticateBasicWorker = bindThunkAction(AuthenticateBasic,
	async (params, dispatch, getState, extraArg) => { // `extraArg` is always `any` (for now)
		let result: boolean = undefined;
		let session: string = undefined;

		const request = Backend.api.authSimpleGet()
		await request.done((payload) => result = payload.body.success)
		
		// On successfull authentication, store session and update authentication status
		if (result) {
			dispatch(RootActionCreators.updateAuthenticated(result))
			//dispatch(SetSessionKey())
		}

		return { success: result };
	});


// Bundle and export action creators
export const AuthenticationActionCreators = {
	authenticate: authenticateBasicWorker,
};
