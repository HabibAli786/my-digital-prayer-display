import { combineReducers } from 'redux';
import authReducer from './components/Redux/reducers/authReducer';

const rootReducers = combineReducers({
    admin : authReducer        
})

export default rootReducers;