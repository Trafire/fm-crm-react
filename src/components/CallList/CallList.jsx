import React from "react";
import {connect} from "react-redux";

import ListSubheader from '@material-ui/core/ListSubheader';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import {clientActions} from "../../actions";

const callListStyle = {width: 250};

class CallList extends React.Component {

    handleChange = (clientCode, e) => {
        this.props.dispatch(clientActions.getDetailsByCode(clientCode));
        this.props.dispatch(clientActions.setActiveByCode(clientCode));
    };

    render() {

        const {client} = this.props;
        const elements = client.client;
        const items = elements.map((value) =>
            <ListItem button onClick={(e)=> this.handleChange(value.client_code, e)} key={value.client_code}>{value.client_code} - {value.ratio}</ListItem>
        );


        return (
            <List style={callListStyle} subheader={<ListSubheader component="div">Client List</ListSubheader>}>
                {items}
            </List>

            )
        }
    }

function mapStateToProps(state) {
    const {client} = state;
    return {
        client
    };
}

const
    connectedCallList = connect(mapStateToProps)(CallList);
export {
    connectedCallList as CallList };
