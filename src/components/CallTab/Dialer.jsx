import React from "react";
import {connect} from "react-redux";
import {clientPhoneNumbersActions} from "../../actions";

class PhoneDialer extends React.Component {
    constructor(props) {
        super(props);
        this.makeCall = this.makeCall.bind(this);
    }
    componentDidMount() {
        this.props.dispatch(clientPhoneNumbersActions.getNumberByContactID(this.props.id));
    }
    makeCall(){
        console.log(this.props.id);
        clientPhoneNumbersActions.makeCall(this.props.salespersonPhoneNumber.active,this.props.id)

    }



    render() {
        //const client_info = this.props.clientPhoneNumber[this.props.id];
        if (this.props.id in this.props.clientPhoneNumber) {
            return (
                <div>
                    <button onClick={this.makeCall}>{this.props.clientPhoneNumber[this.props.id].number_type}</button>
                    {this.props.clientPhoneNumber[this.props.id].number}


                </div>
            );
        } else {
            this.props.dispatch(clientPhoneNumbersActions.getNumberByContactID(this.props.id));
            return <div></div>;
        }
    }
}


function mapStateToProps(state) {
    const {clientPhoneNumber, salespersonPhoneNumber} = state;

    return {
        clientPhoneNumber,
        salespersonPhoneNumber
    };
}

const connected_component = connect(mapStateToProps);
const connectedDialer = connected_component(PhoneDialer);
export {connectedDialer as PhoneDialer};
