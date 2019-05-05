import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {salespersonActions} from '../../actions/salesperson.actions';
import {clientActions} from "../../actions/client.actions";
import {uiActions}  from "../../actions/ui.actions";


import {unstable_Box as Box} from '@material-ui/core/Box';
import {flexbox} from '@material-ui/system';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';

import CircularProgress from '@material-ui/core/CircularProgress';

import {CallList} from "../CallList/CallList";
import {NavTabs,TabContents} from "../UI"


class HomePage extends React.Component {
    componentDidMount() {
        // defaults open tab to "calls"

        this.props.dispatch(salespersonActions.getByUserID(this.props.user.user.id));
        this.props.dispatch(clientActions.getByUserID(this.props.user.user.id));
        this.props.dispatch(clientActions.getDetailsByCode("CAN*ON"));

    }

    render() {
        console.log("RENDER");
        const {salesperson} = this.props;
        if (salesperson != null ) {
            return (
                <Box>
                    <TopBar/>
                    <Box display="flex" flexDirection="row">

                        <Box order={0}>
                            <CallList/>
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

        </Box>);
    }
}


function TopBar(props) {
    return (
        <AppBar position="static">
            <Typography variant="h6" color="inherit">
                FleuraMetz Canada Customer Relations
            </Typography>
        </AppBar>);
}

function mapStateToProps(state) {
    const {authentication, salesperson, client, ui} = state;
    const {user} = authentication;

    const clientData = client.client;
    return {
        user,
        salesperson: salesperson.salesperson,
    };
}
const connected_component = connect(mapStateToProps);
const connectedHomePage = connected_component(HomePage);
export {connectedHomePage as HomePage};

