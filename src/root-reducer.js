import { combineReducers } from 'redux';
import authReducer from './components/Redux/reducers/authReducer';

// const persistConfig = {
//     key: 'root',
//     storage,
//     whitelist: ['cart']
// }

const rootReducers = combineReducers({
    admin : authReducer        
})

export default rootReducers