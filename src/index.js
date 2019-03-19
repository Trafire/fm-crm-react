import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './index.css';
import store from "./store";


/*const salesPersonName = "Antoine";
//const salesNumbers = [{objectID: 0, description: "work", number: "905-456-3000"}];
//const salesPerson = {salesPersonName: salesPersonName, salesNumbers: salesNumbers};
const clients = [{
    objectID: 0,
    clientCode: "CT*REM",
    clientName: "San Remo",
    address: "530 KEELE STREET",
    postal: "",
    city: "Toronto",
    country: "",
    phone: [{objectID: 0, description: "number_type", number: "416-606-4980"}],
    regionCode: "",
    lastCall: null,
    callInterval: 7,
    salesperson: null,
    invoice_id: [],
    contact_id: [],
    next_call: null,
    comments: [],
}];

const callList = {
    salesPerson: salesPerson,
    clients: clients,
    tab: 0,
    clientIndex: 0,

};*/



console.log(store.getState().clients);
ReactDOM.render(<App callList={store.getState().clients}/>, document.getElementById('root'));



store.dispatch({type:'CLIENTS_CHANGE_FOCUS', clientIndex:3});
store.dispatch({type:'CLIENTS_CHANGE_FOCUS', clientIndex:5});
console.log(store.getState().storyState);
