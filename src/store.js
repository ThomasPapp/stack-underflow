import { createStore, combineReducers, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';

// reducers
import loginReducer from './ducks/loginReducer';
import userReducer from './ducks/userReducer';

const reducers = combineReducers({
    loginReducer,
    userReducer
});

export default createStore(reducers, applyMiddleware(promiseMiddleware()));