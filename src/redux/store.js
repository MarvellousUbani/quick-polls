import {createStore, applyMiddleware} from 'redux';

import {persistStore} from 'redux-persist';


import logger from 'redux-logger';
import thunk from 'redux-thunk'

import rootReducer from './root-reducer.js';

const middlewares = [thunk, logger];

export const store = createStore(rootReducer, applyMiddleware(...middlewares));

export const persistor = persistStore(store);

export default {persistor, store};
