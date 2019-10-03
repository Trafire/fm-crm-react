import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {salespersonActions} from '../../actions/salesperson.actions';
import {clientActions} from "../../actions/client.actions";
import {commentsActions} from "../../actions/";
//import {salespersonPhoneNumbersActions} from '../../actions/salespersonPhoneNumbers.actions';
//import {uiActions}  from "../../actions/ui.actions";


import {unstable_Box as Box} from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';

import CircularProgress from '@material-ui/core/CircularProgress';

import {CallList} from "../CallList/CallList";
import {NavTabs,TabContents} from "../UI"
import {contactActions} from "../../actions";
//import {contactActions} from "../../actions";


class HomePage extends React.Component {
    componentWillMount() {
        // defaults open tab to "calls"

        this.props.dispatch(salespersonActions.getByUserID(this.props.user.user.id));
        this.props.dispatch(clientActions.getByUserID(this.props.user.user.id));
        this.props.dispatch(contactActions.getBySalesID(4));
        this.props.dispatch(commentsActions.getByClientID());
        //this.props.dispatch(commentsActions.getByClientID(0)); //todo: chanege this to update all clients
        this.timerID = setInterval(
            () => this.updateClients(),
            10000
        );
        //this.props.dispatch(clientPhoneNumbersActions.getNumberByContactID(6443))
        //this.props.dispatch(clientActions.getDetailsByCode("CAN*ON"));
        //this.props.dispatch(salespersonPhoneNumbersActions.getNumberByContactID("1"));
    }

    updateClients () {
        this.props.dispatch(clientActions.getByUserID(this.props.user.user.id));
    }

    render() {
        const {salesperson} = this.props;
        if (salesperson != null &&true) {
            return (
                <Box>
                    <TopBar activeClient={this.props.activeClient}/>
                    <Box display="flex" flexDirection="row">

                        <Box order={0}>
                            <CallList updateClients={this.updateClients}/>
                        </Box>
                        <Box order={1}>
                            <NavTabs/>

                            <TabContents/>
                        </Box>
                    </Box>
                    <p>
                        <Link to="/login">Logout</Link>
                    </p>
                </Box>
            );
        }
        return (<Box
            container
            direction="row"
            justify="center"
            alignItems="center"
        >
            Loading... <CircularProgress/>
            <Link to="/login">Logout</Link>
        </Box>);
    }
}


function TopBar(props) {
    let today = new Date();
    today = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()));
    return (
        <AppBar position="static">
            <Typography variant="h6" color="inherit">
                FleuraMetz Canada Customer Relations -
                {props.activeClient}
            </Typography>
        </AppBar>);
}

function mapStateToProps(state) {
    const {authentication, salesperson, contact, client} = state;
    const {user} = authentication;
    return {

        user,
        salesperson: salesperson.salesperson,
        contact,
        activeClient: client.activeClient,
    };
}
const connected_component = connect(mapStateToProps);
const connectedHomePage = connected_component(HomePage);
export {connectedHomePage as HomePage};
