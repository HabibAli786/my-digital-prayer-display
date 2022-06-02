import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'
import storage from 'redux-persist/lib/storage'

import rootReducer from './root-reducer';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(
    rootReducer,
    composeEnhancer(applyMiddleware(thunk))
    // applyMiddleware(thunk)
  );

export default store 