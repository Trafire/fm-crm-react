import React, {useState, useEffect} from 'react';
import {connect} from "react-redux";
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Badge from '@material-ui/core/Badge';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import Checkbox from '@material-ui/core/Checkbox';
import {notificationActions} from "../../actions/notification.actions";

export function countNotifications(activeClient, notifications) {
    let count = 0;
    for (let i = 0; i < notifications.length; i++)
        if (!notifications[i].completed.includes(activeClient)) {
            count++;
        }
    return count;
}

class NotificationText extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        let checked = false;
        if (props.data.completed.includes(props.activeClient)) {
            checked = true;
        }
        this.state = {
            checked: checked,
        };
    }

    handleChange(event) {
        if (!this.state.checked) {
            this.setState({checked: true});
            this.props.dispatch(notificationActions.markComplete(this.props.activeClient, this.props.data.id))
    } else {
            this.setState({checked: false});
            this.props.dispatch(notificationActions.removeComplete(this.props.activeClient, this.props.data.id))
        }
    }
    componentDidUpdate(prevProps) {
        if (prevProps.activeClient != this.props.activeClient){
            this.setState( {checked: this.props.data.completed.includes(this.props.activeClient)});
        }
    }

    render() {

        const textStyle = {};
        if (this.state.checked) {
            textStyle.textDecoration = "line-through";
        } else {
            textStyle.textDecoration = "";
        }

        return (
            <li style={{listStyleType:'none'}}><Checkbox checked={this.state.checked} onChange={this.handleChange}/> <span
                style={textStyle}>{this.props.data.text}</span>
            </li>
        );

    }
}


class Notifications extends React.Component {
    render() {
        const notifications = this.props.notification;
        const notificationsList = [];
        for (let i = 0; i < notifications.length; i++) {
            notificationsList.push(
                <NotificationText dispatch={this.props.dispatch} activeClient={this.props.SelectedClient}
                                  data={notifications[i]}/>
            )
        }


        return (
            <div><ExpansionPanel>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <div style={{justifyContent: "space-between",}}>

                        <div>

                            <div><Typography>Talking Points: <Badge
                                badgeContent={countNotifications(this.props.client.activeClient, notifications)
                                } color="primary">

                                <InfoOutlinedIcon/>
                            </Badge></Typography>
                            </div>
                        </div>
                    </div>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Typography>

                        {notificationsList}
                    </Typography>
                </ExpansionPanelDetails>
            </ExpansionPanel>
            </div>
        );
    }
}


function mapStateToProps(state) {
    const {client, contact, notification} = state;

    return {
        contact,
        notification,
        client,
    };
}

const connected_component = connect(mapStateToProps);
const connectedNotifications = connected_component(Notifications);
export {connectedNotifications as Notifications};
