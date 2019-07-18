import React from "react";
import {connect} from "react-redux";

import ListSubheader from '@material-ui/core/ListSubheader';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import {clientActions, commentsActions, contactActions} from "../../actions";
import {withStyles} from '@material-ui/core/styles';
import {colourConstants} from "../../constants";

const StyledListItem = withStyles({
    root: {
        'data-freshness > .1' : 'background: colourConstants.BLUE,',

        '&:hover': {
            background: colourConstants.FM_ORANGE,
        },
        '&:active': {
            background: colourConstants.FM_ORANGE,
        },
        activeItem: {
            background: colourConstants.FM_ORANGE,
        },
        '&:selected': {
            background: colourConstants.FM_ORANGE,
        },
    },
    activeItem: {
        background: colourConstants.FM_ORANGE,
    },
    active: {
        backgroundColor: 'rgba(255, 255, 255, 0.12)',
    },
    label: {
        textTransform: 'capitalize',
    },
})(ListItem);


const callListStyle =
    {
        width: 250,
    };

class CallList extends React.Component {



    handleChange = (clientCode, id) => {

        this.props.dispatch(clientActions.getDetailsByCode(clientCode));
        this.props.dispatch(clientActions.setActiveByCode(clientCode));
        this.props.dispatch(contactActions.getCallsMade(clientCode));

    };


    render() {

        const {client} = this.props;
        const elements = client.client;
        console.log(client);
        const items = elements.map((value) =>


            <ClientItems client_code={value.client_code} client_id={value.client_id} ratio={value.ratio}
                         className={callListStyle.items} button handleChange={this.handleChange}
                         key={value.client_code}/>
        );


        return (
            <List style={callListStyle} subheader={<ListSubheader component="div">Client List</ListSubheader>}>
                {items}
            </List>

        )
    }
}

function ClientItems(props) {

    return (<StyledListItem button data-freshness={props.ratio}
                            onClick={(e) => props.handleChange(props.client_code, props.client_id, e)}
                            key={props.client_code}>{props.client_code} - {props.ratio}</StyledListItem>)
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
    connectedCallList as CallList
};
