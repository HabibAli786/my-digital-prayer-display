import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import rootReducer from './root-reducer';

const persistConfig = {
  key: 'root',
  storage,
}

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(
    persistedReducer,
    composeEnhancer(applyMiddleware(thunk))
    // applyMiddleware(thunk)
  );

export const persistor = persistStore(store)

export default { store, persistor }