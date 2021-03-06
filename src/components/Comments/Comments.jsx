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
import {commentsActions} from "../../actions";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';


function CommentsDisplay(props) {
    const initials = props.firstName.substring(0, 1) + props.lastName.substring(0, 1);
    const items = [];
    const active = props.client.activeClient;
    props.dispatch(commentsActions.getCommentsByClient(active));
    try {
        const activeId = props.client.clientDetails[active].client_id;

        for (const [index, comment] of props.comments.entries()) {
            if (comment.client_id === activeId) {
                items.push(<CommentLine key={index} comment={comment} initials={initials} dispatch={props.dispatch}/>)
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

function DeleteCommentButton(props) {
    function delete_comment(){
        props.dispatch(commentsActions.deleteComment(props.id));
    }

    return (<IconButton onClick={delete_comment} aria-label="delete">
            <DeleteIcon />
        </IconButton>)



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
                                {date.toString()}<DeleteCommentButton id={props.comment.id} dispatch={props.dispatch}/>
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
