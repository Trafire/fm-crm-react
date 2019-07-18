import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import React from "react";
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {commentsActions} from "../../actions/comment.actions";

export default function CommentDialog(props) {
    const [open, setOpen] = React.useState(false);
    const [text, setText] = React.useState('');

    function handleClickOpen() {
        setOpen(true);
    }

    function handleClose() {
        setOpen(false);
    }

    function save() {
        let selected_date = new Date();
        let formatted = selected_date.toISOString();
        let call_id = props.call_id;

        props.dispatch(commentsActions.addComment(formatted, text, props.salesperson_id,
            props.clientId, call_id, false));
        setText("");
        setOpen(false);
    }

    function handleChange(event) {
        setText(event.target.value);
    }

    return (
        <div>
            <Button variant="contained"
                    onClick={handleClickOpen}
                    color="primary">
                Add Comment
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Comments</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Add Comment About this call
                    </DialogContentText>
                    <textarea
                        value={text}
                        onChange={handleChange}
                        autoFocus
                        margin="dense"
                        id="commentText"
                        label="Comment"
                        type="email"
                        rows={4}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={save} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>

    );

}


