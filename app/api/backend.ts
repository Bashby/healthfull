// Lib Imports


// Local Imports
import { HealthfullApi } from './api';



class Backend {
	api: HealthfullApi;
	private static _instance: Backend;
	
	private constructor() {
		this.api = new HealthfullApi("http://localhost:9494");
	}

	public static get Instance() {
		// Do you need arguments? Make it a regular method instead.
		return this._instance || (this._instance = new this());
	}
}

export const BackendSingleton = Backend.Instance;