import React from "react";
import {connect} from "react-redux";
import {clientPhoneNumbersActions, clientActions,contactActions} from "../../actions";
import CallIcon from '@material-ui/icons/Call';
import IconButton from '@material-ui/core/IconButton';


import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {clientService} from "../../services/client.service";
import {clientPhoneNumbersService} from "../../services/clientPhoneNumbers.service";


class PhoneDialer extends React.Component {
    constructor(props) {
        super(props);
        this.handleAlertAnswer = this.handleAlertAnswer.bind(this);
        this.handleAlertNoAnswered = this.handleAlertNoAnswered.bind(this);
        this.makeCall = this.makeCall.bind(this);
        this.resetCallTimer = this.resetCallTimer.bind(this);
        this.state = {alertOpen: false, lastCall: null, callBackOpen: true,};
    }
    handleAlertAnswer () {
        this.props.dispatch(contactActions.setAnswer(this.state.lastCall, true));
        this.setState({
            alertOpen: false,
        });
    }

    handleAlertNoAnswered () {
        this.props.dispatch(contactActions.setAnswer(this.state.lastCall, false));
        this.props.dispatch(contactActions.getCallsMade(this.props.client.activeClient));

        this.setState({
            alertOpen: false,
            callBackOpen: true,
        });

    }
    componentDidMount() {
        this.props.dispatch(clientPhoneNumbersActions.getNumberByContactID(this.props.id));
    }

    makeCall() {
       clientPhoneNumbersService.makeCall(
            this.props.salespersonPhoneNumber.active,
            this.props.id).then(
           data => {
               this.props.dispatch(contactActions.getCallsMade(this.props.client.activeClient));
               this.setState({
                   alertOpen: true,
                   lastCall: data.call_id,
               });
               this.resetCallTimer();
           }
       );

        /*this.resetCallTimer();
        setTimeout(this.resetCallTimer, 2000);
        setTimeout(this.resetCallTimer, 5000);
        setTimeout(this.resetCallTimer, 10000);*/


    }

    resetCallTimer() {
        const activeClient = this.props.client.activeClient;
        this.props.dispatch(clientActions.getCallTimes(activeClient))



    }


    render() {
        //const client_info = this.props.clientPhoneNumber[this.props.id];
        if (this.props.id in this.props.clientPhoneNumber) {
            return (
                <div>
                    <IconButton title={this.props.clientPhoneNumber[this.props.id].number}
                                onClick={this.makeCall}><CallIcon/>
                    </IconButton> {this.props.clientPhoneNumber[this.props.id].number_type}
                    <AlertDialog open={this.state.alertOpen}
                                 handleAlertAnswer={this.handleAlertAnswer}
                                 handleAlertNoAnswered={this.handleAlertNoAnswered}
                    />
                </div>
            );
        } else {
            this.props.dispatch(clientPhoneNumbersActions.getNumberByContactID(this.props.id));
            return <div></div>;
        }
    }
}


function AlertDialog(props) {
    const open = props.open;
    return (
        <div>
            <Dialog
                open={open}
                onClose={props.handleAlertAnswer}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Did the Client Answer the call?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Click Yes if the Client Answers and No if not
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.handleAlertAnswer} color="primary">
                        Yes
                    </Button>
                    <Button onClick={props.handleAlertNoAnswered} color="primary" autoFocus>
                        no
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

function CallBack(props) {
    const open = props.open;
    return (
        <div>
            <Dialog
                open={open}
                onClose={props.handleAlertAnswer}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"When Do you want to call them Back?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Call Back in
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.handleAlertAnswer} color="primary">
                        Yes
                    </Button>
                    <Button onClick={props.handleAlertNoAnswered} color="primary" autoFocus>
                        no
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
function mapStateToProps(state) {
    const {clientPhoneNumber, salespersonPhoneNumber, authentication, client} = state;

    return {
        clientPhoneNumber,
        salespersonPhoneNumber,
        user: authentication.user.user,
        client,
    };
}


const connected_component = connect(mapStateToProps);
const connectedDialer = connected_component(PhoneDialer);
export {connectedDialer as PhoneDialer};
