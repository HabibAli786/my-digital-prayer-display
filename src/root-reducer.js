import { combineReducers } from 'redux';
import authReducer from './components/Redux/reducers/authReducer';
import notificationReducer from './components/Redux/reducers/notificationReducer';
import qrCodeReducer from './components/Redux/reducers/qrCodeReducer';

// const persistConfig = {
//     key: 'root',
//     storage,
//     whitelist: ['cart']
// }

const rootReducers = combineReducers({
    admin : authReducer,
    notifi: notificationReducer,
    qrCode: qrCodeReducer       
})

export default rootReducers