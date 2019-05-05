
//import clientReducer from './clients'
import { combineReducers } from 'redux';
import {alert} from './alert.reducer';
import {registration} from './registration.reducer';
import {users} from './users.reducer';
import {authentication} from './authentication.reducer';
import {salesperson} from "./salesperson.reducer";
import {client} from "./client.reducer"
import {ui} from "./ui.reducer"
import {contact} from "./contact.reducer"

const rootReducer = combineReducers({
    alert,
    client,
    contact,
    registration,
    users,
    authentication,
    salesperson,
    ui,
});
export default rootReducer;
