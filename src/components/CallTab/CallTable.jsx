import React from "react";
import {connect} from "react-redux";
import {contactActions} from "../../actions";
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import CommentDialog from '../CallTab/CallDialog'


class CallTable extends React.Component {

    render() {

        let listItems;
        try {
            listItems = this.props.contact.calls.map((call) =>
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
                        <CommentDialog call_id={call.call_id} clientId={this.props.client.clientDetails[this.props.client.activeClient]['client_id']} clientCode={this.props.client.activeClient} salesperson_id={this.props.salesperson.salesperson} dispatch={this.props.dispatch} value={this.props.clientPhoneNumber[call.phone_number_id].phone_number_id}/>

                    </TableCell>

                </TableRow>
            );
        } catch (error) {
            listItems = [];
            console.warn(error);
            return <div>Loading</div>
        }

        return (
            <div>
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
            </div>
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
        this.props.dispatch(contactActions.setAnswer(this.props.id, !this.state.checked));
        this.setState({
                checked: !this.state.checked,
            }
        );
    }

    render() {
        return <Checkbox checked={this.state.checked} onChange={this.handlechange}/>
    }

}

function mapStateToProps(state) {
    const {client, clientPhoneNumber, contact, salesperson} = state;
    return {
        client,
        clientPhoneNumber,
        contact: contact,
        salesperson: salesperson.salesperson,
    };
}

const connected_component = connect(mapStateToProps);
const connectedCallTable = connected_component(CallTable);
export {connectedCallTable as CallTable};
