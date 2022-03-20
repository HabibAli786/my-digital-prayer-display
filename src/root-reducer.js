import { combineReducers } from 'redux';
import authReducer from './components/Redux/reducers/authReducer';
import notificationReducer from './components/Redux/reducers/notificationReducer';
import prayertimesReducer from './components/Redux/reducers/prayertimesReducer';

// const persistConfig = {
//     key: 'root',
//     storage,
//     whitelist: ['cart']
// }

const rootReducers = combineReducers({
    admin : authReducer,
    notifi: notificationReducer,
    prayertimes: prayertimesReducer       
})

export default rootReducers