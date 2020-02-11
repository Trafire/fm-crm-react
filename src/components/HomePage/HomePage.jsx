import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
//import {salespersonActions} from '../../actions/salesperson.actions';
import {clientActions} from "../../actions/client.actions";
import {commentsActions} from "../../actions/";
//import {Notifications} from "../Notification/Notifications"
//import {salespersonPhoneNumbersActions} from '../../actions/salespersonPhoneNumbers.actions';
//import {uiActions}  from "../../actions/ui.actions";
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import CircularProgress from '@material-ui/core/CircularProgress';
import {CallList} from "../CallList/CallList";
import {NavTabs, TabContents} from "../UI"
import {DataManager} from "../DataManager/DataManager";
//import {contactActions} from "../../actions";
//import {DataManager} from "../DataManager/DataManager";
//import {contactActions} from "../../actions";


const logoutStyle = {
    display: "inline-block",
    float: "right",
};


const placement = {
    position: "absolute",
    left: "22%",
    right: 0,
    top: "5%",
    bottom: 0,
    overflow: 'auto',
    padding: "3px",
};

function countProperties(obj) {
    var count = 0;
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop))
            ++count;
    }
    return count;
}


class HomePage extends React.Component {
    constructor(props) {

        super(props);
        this.state = {numClients: 0, loaded: false,};
        //this.loadData = this.loadData.bind(this);
        /*this.dataTimer = setInterval(
            () => this.loadData(),
            500
        );*/
    }

    loadData() {
        if (this.state.numClients === 0) {
            if (this.props.client.length > 0) {

                this.props.client.map((item, index) => {
                    this.props.dispatch(clientActions.getDetailsByCode(item.client_code));
                    this.props.dispatch(commentsActions.getCommentsByClient(item.client_code));
                });

                this.setState({
                    numClients: this.props.client.length,
                });
            }
        } else if (countProperties(this.props.clientDetails) >= this.props.client.length) {

            this.setState({
                loaded: true
            });
            clearInterval(this.dataTimer);
        }

    }


    updateClients() {
        this.props.dispatch(clientActions.getByUserID(this.props.user.user.id));
    }

    render() {

        if (this.state.loading) {
            return <div> Loading....</div>
        }
        const {salesperson} = this.props;

        if ((salesperson != null && true)) {

            return (
                <Box>

                    <TopBar activeClient={this.props.activeClient}/>

                    <Box display="flex" flexDirection="row">

                        <Box order={0}>
                            <CallList updateClients={this.updateClients}/>
                        </Box>
                        <div style={placement}>
                            <Box order={1}>
                                <NavTabs/>

                                <TabContents/>
                            </Box>
                        </div>

                    </Box>
                    <p>

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
                <Link style={logoutStyle} to="/login">Logout</Link>
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
        client: client.client,
        clientDetails: client.clientDetails,
    };
}


const connected_component = connect(mapStateToProps);
const connectedHomePage = connected_component(HomePage);
export {connectedHomePage as HomePage};
