import React from 'react';
import {connect} from "react-redux";
import {assortmentActions, salespersonActions} from "../../actions";
import {clientActions, contactActions} from "../../actions";
import {commentsActions} from "../../actions";
import {salespersonPhoneNumbersActions} from "../../actions/salespersonPhoneNumbers.actions";
import {notificationActions} from "../../actions/notification.actions";

class DataManager extends React.Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = this.shouldComponentUpdate.bind(this);
        this.upDateNotifications = this.upDateNotifications.bind(this);


        // if already logged in load Salesperson and client data
        this.state = {ratioIndex:0};
        this.dataTimer = setInterval(
            () => this.setRatio(),
            3000
        );

        this.notificationTimer = setInterval(
            () => this.upDateNotifications(),
            10000
        );

        if (props && props.user && props.user.user && props.user.user.id) {
            const userID = props.user.user.id;
            this.props.dispatch(salespersonActions.getByUserID(userID));
            this.props.dispatch(clientActions.getByUserID(userID));
            this.props.dispatch(notificationActions.getNotifications());
            this.props.dispatch(assortmentActions.getFullAssortment());
            this.setRatio = this.setRatio.bind(this);

        }
    }

    upDateNotifications() {
        this.props.dispatch(notificationActions.getNotifications());
    }
    setRatio() {
            const numClients = this.props.client.client.length;
            if (numClients > 0) {
                const index = this.state.ratioIndex % numClients;

                this.props.dispatch(clientActions.setCallRatio(index));
                this.setState({ratioIndex: index + 1})
            }
    }

    shouldComponentUpdate(nextProps, nextState) {

        // load salesperson data and client data on log in
        if (nextProps.user !== this.props.user) {
            if (nextProps && nextProps.user && nextProps.user.user && nextProps.user.user.id) {
                const userID = nextProps.user.user.id;
                this.props.dispatch(salespersonActions.getByUserID(userID));
                this.props.dispatch(clientActions.getByUserID(userID));
            }
        }

        if (nextProps.client !== this.props.client) {
            const activeClient = nextProps.client.activeClient;
            if (nextProps.client.activeClient !== this.props.client.activeClient) {

                this.props.dispatch(clientActions.getDetailsByCode(activeClient));
                this.props.dispatch(contactActions.getCallsMade(activeClient));

            } else if (nextProps.client.clientDetails[activeClient] !== this.props.client.clientDetails[activeClient] && nextProps.client.clientDetails[activeClient].contact_id) {
                for (const contactID in nextProps.client.clientDetails[activeClient].contact_id) {
                    const id = nextProps.client.clientDetails[activeClient].contact_id[contactID];

                    this.props.dispatch(contactActions.getByContactID(id));
                    //this.props.dispatch(commentsActions.getCommentsByClient(id));
                }
            }
        }
        if (nextProps.contact !== this.props.contact) {
            if (nextProps.contact.calls !== this.props.contact.calls) {
                this.props.dispatch(commentsActions.getCommentsByClient(nextProps.client.activeClient));
            }

        }

        const quantitySalesNum = this.props.salesperson.salesperson.sales_phone_number_id.length;
        if ( quantitySalesNum > Object.keys(this.props.salespersonPhoneNumber).length - 1) {
            for (let i =  0; i < quantitySalesNum; i++) {
                const id = this.props.salesperson.salesperson.sales_phone_number_id[i];
                this.props.dispatch(salespersonPhoneNumbersActions.getNumberByContactID(id));
            }
        }
        return true;
    }

    render() {

        return (<div/>);
    }

}

function mapStateToProps(state) {
    const {
        alert,
        client,
        comment,
        contact,
        registration,
        authentication,
        salesperson,
        ui,
        clientPhoneNumber,
        salespersonPhoneNumber
    } = state;
    const {user} = authentication;
    return {
        alert,
        client,
        comment,
        contact,
        registration,
        user,
        authentication,
        salesperson,
        ui,
        clientPhoneNumber,
        salespersonPhoneNumber,
    };
}

const connected_component = connect(mapStateToProps);
const connectedDataManager = connected_component(DataManager);
export {connectedDataManager as DataManager};
