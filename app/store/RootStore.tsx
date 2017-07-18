// Lib Imports
import createHistory from 'history/createBrowserHistory';
import { applyMiddleware, createStore, compose, Store, StoreEnhancer, GenericStoreEnhancer, StoreEnhancerStoreCreator } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import {rootReducer} from '../reducers/RootReducer';
import { IState } from '../reducers/RootReducer';
import DevTools from '../containers/DevTools';

export const history = createHistory();
const middleware = routerMiddleware(history);

let enhancer: StoreEnhancer<IState> = (process.env.NODE_ENV === 'production')
    ? applyMiddleware(middleware)
    : compose(applyMiddleware(middleware), DevTools.instrument()) as GenericStoreEnhancer;

export function configureStore(initialState?: IState): Store<IState> {
    return createStore(
        rootReducer,
        initialState,
        enhancer
    );
}