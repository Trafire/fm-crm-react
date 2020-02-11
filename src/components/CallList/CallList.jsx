import React from "react";
import {connect} from "react-redux";

import ListSubheader from '@material-ui/core/ListSubheader';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import {clientActions, contactActions} from "../../actions";
import {withStyles} from '@material-ui/core/styles';
import {colourConstants} from "../../constants";
import './CallList.css';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import Badge from '@material-ui/core/Badge';
import {countNotifications} from "../Notification/Notifications";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

const StyledListItem = withStyles({
    root: {
        'data-freshness > .1': 'background: colourConstants.BLUE,',
        '&:hover': {
            background: colourConstants.FM_PALE_BLUE,
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
    good: {
        background: colourConstants.FM_RED,
    },

    /*activeItem: {
        background: colourConstants.FM_ORANGE,
    },*/
    active: {
        backgroundColor: 'rgba(255, 255, 255, 0.12)',
    },
    label: {
        textTransform: 'capitalize',
    },
})(ListItem);

const callListStyle =
    {
        position: "absolute",
        width: "20%",
        top: "5%",
        bottom: 5,
        overflow: 'auto',

    };
const scrollStyle = {
    position: "absolute",
    width: "100%",
    top: "10%",
    bottom: 5,
    overflow: 'auto',
};

function SearchField(props) {
    return (<TextField
        id="standard-name"
        label="Search Clients"
        onChange={event => props.onChange(event.target.value)}
        margin="normal"
        variant="outlined"
        fullWidth
    />)
}

class CallList extends React.Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.state = {keyword: ''};
    }

    handleChange = (clientCode, id) => {
        //this.props.dispatch(clientActions.getDetailsByCode(clientCode));
        this.props.dispatch(clientActions.setActiveByCode(clientCode));

        //this.props.dispatch(contactActions.getCallsMade(clientCode));
    };

    onChange(value) {
        this.setState({'keyword': value});
    }

    render() {
        const {client} = this.props;
        let elements = client.client.slice(0);
        elements.sort(function (a, b) {

            return a.ratio_sort - b.ratio_sort;
        });
        elements.reverse();
        elements = filterClients(elements, this.state.keyword);
        const items = elements.map((value) =>
            <
                ClientItems client_code={value.client_code} client_id={value.client_id} ratio={value.ratio}
                            className={callListStyle.items} button handleChange={this.handleChange}
                            key={value.client_code} notifications={this.props.notifications}
            />
        );
        return (
            <div style={callListStyle}>
                <div>
                    <SearchField onChange={this.onChange}/>
                </div>
                <div style={ scrollStyle}>
                    <List  subheader={<ListSubheader component="div"> </ListSubheader>}>
                        {items}
                    </List>
                </div>
            </div>

        )
    }
}

function filterClients(elements, keyword) {
    return elements.filter(
        function (elements) {
            if (keyword.trim() === '') {
                return true;
            } else {
                return elements.client_code.toUpperCase().trim().includes(keyword.toUpperCase().trim());
            }
        });
}

function ClientItems(props) {
    let desc = '';
    if (props.ratio > 1.1) {
        desc += "bad"
    } else if (props.ratio > 1) {
        desc += "ok"
    } else {
        desc += "good"
    }
    const icon = (
        <Badge badgeContent={countNotifications(props.client_code, props.notifications)} color="primary">
        </Badge>
    );
    return (

        <StyledListItem className="neutral" button data-freshness={props.ratio}
                        onClick={(e) => props.handleChange(props.client_code, props.client_id, e)}
                        key={props.client_code} style={{justifyContent: 'space-between'}}>

                    <span className={desc + " CallList"}>
                        {props.client_code} ~ {parseFloat(props.ratio).toLocaleString("en", {style: "percent"})}
                    </span>

            <Badge badgeContent={countNotifications(props.client_code, props.notifications)}
                   color="secondary">
                <InfoOutlinedIcon/>
            </Badge>


        </StyledListItem>
    )
}


function mapStateToProps(state) {
    const {client, notification} = state;
    return {
        client,
        notifications: notification,
    };
}

const
    connectedCallList = connect(mapStateToProps)(CallList);
export {
    connectedCallList as CallList
};
//
