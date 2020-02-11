import TextField from "@material-ui/core/TextField";
import React from "react";

export function SearchField(props) {

    return (<TextField
        value={props.keyword}
        id="standard-name"
        label={props.label}
        onChange={event => props.onChange(event.target.value)}
        margin="normal"
        variant="outlined"
        fullWidth
    />)
}
