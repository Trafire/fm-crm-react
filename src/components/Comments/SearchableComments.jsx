import React, {useState} from 'react';
import {connect} from "react-redux";
import {CommentRow} from "./CommentRow"
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import AppBar from '@material-ui/core/AppBar';
import {AddCommentButton}  from "./AddComment"


function SearchField(props) {
    return ( <TextField
        id="standard-name"
        label="Search Comments"
        onChange={event => props.onChange(event.target.value)}
        margin="normal"
        variant="outlined"
        fullWidth
    />)
}

function pagenate(data, pageSize, index) {
    const dataLength = data.length;
    const totalPages = Math.ceil(dataLength / pageSize);
    /*if (index > totalPages - 1) {
        index = index % totalPages;
    }*/
    let start = index * pageSize;
    let end = start + pageSize;
    if (end > dataLength) {
        end = dataLength;
    }
    return data.slice(start, end);
}

function keepIndexInBounds(index,totalPages) {
    if (totalPages === 0) {
        return 0;
    }
    if (index >= totalPages) {
        return keepIndexInBounds(index - totalPages,totalPages)
    }
    if (index < 0) {
        return keepIndexInBounds(index + totalPages,totalPages)
    }
    return index;
}



function SearchableComments(props) {
    const [page, setPage] = useState(0);
    const [keyword, setKeyword] = useState('');
    const pageLength = 5;
    let comments = props.comments;
    comments = comments.filter(
        function (comment) {
            if (keyword.trim() === '') {
                return true;
            }
            else {
                return comment.comment.toUpperCase().trim().includes(keyword.toUpperCase().trim());
            }
        }
    );
    const results = comments.length;
    const totalPages = Math.ceil(results / pageLength);
    const newPage = keepIndexInBounds(page,totalPages);
    if (page !== newPage) {
        setPage(newPage);
    }
    //comments.reverse();
    comments = comments.sort((a,b) => (a.time > b.time) ? 1:-1);
    comments = pagenate(comments, pageLength, page);
    const initials = props.firstName.substring(0, 1) + props.lastName.substring(0, 1);
    const listItems = comments.map((comment) =>
        <CommentRow comment={comment} highlight={keyword} initials={initials}/>
    );


    return (
        <div>
            <AddCommentButton/>
            <SearchField onChange={setKeyword}/>
            <List>{listItems}</List>
            <button onClick={() => setPage(page - 1)}>Back</button>
            <button onClick={() => setPage(page + 1)}>Next</button>
            <p>Page: {page + 1} / {totalPages} </p>
            <p>Total Results: {results}</p>

        </div>);
}

function mapStateToProps(state) {
    const {salesperson, client, comment} = state;

    return {
        lastName: salesperson.salesperson.last_name, //TODO: Make name who called not who is logged in
        firstName: salesperson.salesperson.first_name,
        comments: comment.comments,
        salesperson,
        client,

    };
}


const connected_component = connect(mapStateToProps);
const connectedSearchableComments = connected_component(SearchableComments);
export {connectedSearchableComments as SearchableComments};
