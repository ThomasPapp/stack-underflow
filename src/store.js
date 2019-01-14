import { createStore, combineReducers, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';

import loginReducer from './ducks/loginReducer';

const reducers = combineReducers({
    loginReducer
});

export default createStore(reducers, applyMiddleware(promiseMiddleware()));