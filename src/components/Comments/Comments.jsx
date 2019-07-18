import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import {connect} from "react-redux";

function CommentsDisplay(props) {
    const initials = props.firstName.substring(0, 1) + props.lastName.substring(0, 1);
    const items = [];
    const active = props.client.activeClient;
    try {
        const activeId = props.client.clientDetails[active].client_id;

        for (const [index, comment] of props.comments.entries()) {
            if (comment.client_id === activeId) {
                items.push(<CommentLine key={index} comment={comment} initials={initials}/>)
            }
        }

        return (
            <div>
                {items}
            </div>
        );
    } catch {
        return <div/>;
    }
}

function CommentLine(props) {

    let date = new Date(props.comment.time);


    return (

        <List>
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar>{props.initials}</Avatar>
                </ListItemAvatar>

                <ListItemText
                    primary={props.comment.name}
                    secondary={
                        <React.Fragment>
                            <Typography
                                component="span"
                                variant="body2"
                                color="textPrimary"
                            >
                                {date.toString()}
                            </Typography>
                            {props.comment.comment}
                        </React.Fragment>
                    }
                />
            </ListItem>
        </List>

    );

}


function mapStateToProps(state) {
    const {salesperson, client, comment} = state;

    return {
        lastName: salesperson.salesperson.last_name, //TODO: Make name who called not who is logged in
        firstName: salesperson.salesperson.first_name,
        comments: comment.comments,
        client

    };
}


const connected_component = connect(mapStateToProps);
const connectedCommentsDisplay = connected_component(CommentsDisplay);
export {connectedCommentsDisplay as CommentsDisplay};
