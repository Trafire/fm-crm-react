import React from "react";
import {connect} from "react-redux";
import {salespersonPhoneNumbersActions} from "../../actions/salespersonPhoneNumbers.actions"
//import ListSubheader from '@material-ui/core/ListSubheader';
//import ListItem from '@material-ui/core/ListItem';
//import List from '@material-ui/core/List';
//import {salespersonActions} from "../../actions";
//import {salesperson} from "../../reducers/salesperson.reducer";
//import {salespersonPhoneNumber} from "../../reducers/salespersonPhoneNumbers.reducer";

//const callListStyle = {width: 250};

class SalesSettings extends React.Component {

    render() {
        const elements = this.props.salesperson.salesperson.sales_phone_number_id;
        const items = [];
        for (const [index, value] of elements.entries()) {
            const numbers = this.props.salespersonPhoneNumber[value];
            try {
                items.push(<option key={index} value={value}>{numbers.number_description}</option>);
            }
            catch (err) {
                console.error(err);
                this.props.dispatch(salespersonPhoneNumbersActions.getNumberByContactID(value));
            }
        }

        return (
            <div>
                <li>Salesperson: {this.props.salesperson.salesperson.first_name} {this.props.salesperson.salesperson.last_name}</li>
                <li>Email: {this.props.salesperson.salesperson.email}</li>
                <p> Call From</p>
                <PhoneSelector dispatch={this.props.dispatch} elements={elements} salespersonPhoneNumber={this.props.salespersonPhoneNumber}/>
            </div>


        )
    }
}

class PhoneSelector extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.updateParent = this.updateParent.bind(this);

    }

    handleChange = event => {
        console.log(event.target.value);
        console.log(this.props.salespersonPhoneNumber);
        this.props.dispatch(salespersonPhoneNumbersActions.setSenderID(event.target.value))
    };
    updateParent = event => {
        this.handleChange(event.parent.target.parentNode);
    };

    render() {
        const items = [];
        const elements = this.props.elements;
        for (const [index, value] of elements.entries()) {
            console.log();
            const numbers = this.props.salespersonPhoneNumber[value];
            try {
                items.push(<option key={index} value={value} >{numbers.number_description}</option>);

            }
            catch (err) {
                console.error(err);
                this.props.dispatch(salespersonPhoneNumbersActions.getNumberByContactID(value));

            }

        }
        return <div> <select value={this.props.salespersonPhoneNumber.active} onChange={this.handleChange}>{items}</select> </div>
    }

}

function mapStateToProps(state) {
    const {salesperson,salespersonPhoneNumber} = state;
    return {
        salesperson,
        salespersonPhoneNumber,
    };
}

const
    connectedSalesSettings = connect(mapStateToProps)(SalesSettings);
export {
    connectedSalesSettings as SalesSettings };
