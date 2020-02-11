import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import React from "react";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import {commentsActions} from "../../actions";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from '@material-ui/icons/Delete';
import {connect} from "react-redux";


function findCommentIndex(comments, comment) {
    //todo: change to binary search based on id if this is too slow
    for (let i=0; i < comments.length; i++) {
        if (comments[i].id === comment.id) {
            return i;
        }
    }
}

function getHighlightedText(text, highlight) {
    // Split on higlight term and include term into parts, ignore case
    let parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return <span> { parts.map((part, i) =>
        <span key={i} style={part.toLowerCase() === highlight.toLowerCase() ? { fontWeight: 'bold' } : {} }>
            { part }
        </span>)
    } </span>;
}

function CommentRow(props) {

    let date = new Date(props.comment.time);
    let newText = props.comment.comment.split('\n').map((item, i) => {
        let text = getHighlightedText(item, props.highlight);
        return <p key={i}>{text}</p>;
    });

    return (
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
                            {date.toLocaleString()}<DeleteCommentButton comments={props.comments}  comment={props.comment} id={props.comment.id}
                                                                  dispatch={props.dispatch}/>
                        </Typography>
                        <Typography
                            component="span"
                            variant="body1"
                            color="textPrimary"
                        >
                            {newText}
                        </Typography>
                    </React.Fragment>

                }
            />

        </ListItem>

    );
}
function DeleteCommentButton(props) {
    const index = findCommentIndex(props.comments, props.comment);
    function delete_comment(){
        props.dispatch(commentsActions.deleteComment(props.id, index));
    }

    return (<IconButton onClick={delete_comment} aria-label="delete">
        <DeleteIcon />
    </IconButton>)

}

function mapStateToProps(state) {
    const {salesperson, client, comment} = state;

    return {
        salesperson,
        comments: comment.comments,
    };
}


const connected_component = connect(mapStateToProps);
const connectedCommentRow = connected_component(CommentRow);
export {connectedCommentRow as CommentRow};
