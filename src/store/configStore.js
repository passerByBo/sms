import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

const middlewares = [thunk, createLogger];

const configStore = compose(applyMiddleware(...middlewares))(createStore)

export default configStore;