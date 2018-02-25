import TodoReducer from '../reducers'
import {createStore,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
const store=createStore(TodoReducer,applyMiddleware(thunk,logger));

export default store