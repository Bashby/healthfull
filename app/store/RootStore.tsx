// Lib Imports
import { applyMiddleware, createStore, compose, Store, StoreEnhancer, GenericStoreEnhancer } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

// Local Imports
import { rootReducer, IState } from '../reducers/Root';
import { DevToolsContainer } from '../containers/DevTools';

// Prepare middleware
export const history = createHistory();
const routerHistoryMiddleware = applyMiddleware(routerMiddleware(history));
const thunkMiddleware = applyMiddleware(thunk)

const enhancer: StoreEnhancer<IState> = (process.env.NODE_ENV === 'production')
	? compose(routerHistoryMiddleware, thunkMiddleware)
	: compose(routerHistoryMiddleware, thunkMiddleware, DevToolsContainer.instrument()) as GenericStoreEnhancer;

export function configureStore(initialState?: IState): Store<IState> {
	return createStore(
		rootReducer,
		initialState,
		enhancer
	);
}