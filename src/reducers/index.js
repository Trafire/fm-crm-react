
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
import {clientPhoneNumber} from "./clientPhoneNumbers.reducer"
import {salespersonPhoneNumber} from "./salespersonPhoneNumbers.reducer"
import {comment} from "./comment.reducer"
import {userConstants} from '../constants'
import {email} from "./email.reducer"
import {notification} from "./notification.reducer"
import {assortment} from "./assortment.reducers";
import {weeklyPrices} from "./weeklyPrices.reducers"

const appReducer = combineReducers({
    alert,
    client,
    comment,
    contact,
    registration,
    users,
    authentication,
    salesperson,
    ui,
    clientPhoneNumber,
    salespersonPhoneNumber,
    email,
    notification,
    assortment,
    weeklyPrices,
});

const rootReducer = (state, action) => {
    if (action.type === userConstants.LOGOUT) {
        state = undefined;
    }

    return appReducer(state, action)
};

export default rootReducer;
