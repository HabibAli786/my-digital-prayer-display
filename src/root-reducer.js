import { combineReducers } from 'redux';
import authReducer from './components/Redux/reducers/authReducer';
import notificationReducer from './components/Redux/reducers/notificationReducer';

// const persistConfig = {
//     key: 'root',
//     storage,
//     whitelist: ['cart']
// }

const rootReducers = combineReducers({
    admin : authReducer,
    notifi: notificationReducer        
})

export default rootReducers