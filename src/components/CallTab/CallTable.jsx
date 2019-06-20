import React from "react";
import {connect} from "react-redux";
import {clientPhoneNumbersActions, contactActions} from "../../actions";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';

class CallTable extends React.Component {
    render() {
        try {
            var listItems = this.props.contact.calls.map((call) =>
                <TableRow>
                    <TableCell
                        align="center">{this.props.contact.contacts[this.props.clientPhoneNumber[call.phone_number_id].contact_id].name}</TableCell>
                    <TableCell
                        align="center">{this.props.clientPhoneNumber[call.phone_number_id].number_type}</TableCell>
                    <TableCell
                        align="center">{new Date(call.time_of_call).toDateString()} {new Date(call.time_of_call).toLocaleTimeString()}</TableCell>
                    <TableCell align="center"><Checkboxes id={call.call_id} dispatch={this.props.dispatch}
                                                          checked={call.answered}/></TableCell>
                    <TableCell align="center">
                        <Button variant="contained"
                                color="primary" value="{this.props.clientPhoneNumber[call.phone_number_id].number_type}">Add Comment</Button>
                    </TableCell>
                </TableRow>
            );
        } catch (error) {
            var listItems = [];
            console.warn(error);
            return <div>Loading</div>
        }

        return (
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Number</TableCell>
                        <TableCell align="center">Time</TableCell>
                        <TableCell align="center">Answered</TableCell>
                        <TableCell align="center">Comments</TableCell>
                    </TableRow>
                    {listItems}
                </TableHead>
            </Table>
        );

    }
}

class Checkboxes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: this.props.checked,
        };
        this.handlechange = this.handlechange.bind(this);
    }

    handlechange(e) {
        this.setState({
                checked: !this.state.checked,
            }
        )
        this.props.dispatch(contactActions.setAnswer(this.props.id, this.state.checked))
    }

    render() {
        return <Checkbox checked={this.state.checked} onChange={this.handlechange}/>
    }

};

function mapStateToProps(state) {
    const {clientPhoneNumber, contact} = state;
    return {
        clientPhoneNumber,
        contact: contact
    };
}

const connected_component = connect(mapStateToProps);
const conmectedCallTable = connected_component(CallTable);
export {conmectedCallTable as CallTable};
