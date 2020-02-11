import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import {connect} from "react-redux";
import {salespersonPhoneNumbersActions} from "../../actions/salespersonPhoneNumbers.actions";

const radioStyle = {
    padding: 3,
    display: "inline-block"
};
function RadioButton(props) {

    return (<Radio
        checked={props.selectedValue === props.id}
        onChange={props.handleChange}
        value={props.id}
        control={<Radio color="primary"/>}
        label={props.description}
        labelPlacement="start"
        title={props.number}
        inputProps={{'aria-label': props.description}}
    />);

}


function SalesNumberPicker(props) {

    const handleChange = event => {
        props.dispatch(salespersonPhoneNumbersActions.setSenderID(event.target.value));

    };

    const numbers = [];

    for (const index in props.salespersonPhoneNumber) {
        const element = props.salespersonPhoneNumber[index];
        if (typeof (element) === "object") {
            try {
            numbers.push(
                <div style={radioStyle} >

                    <Radio
                        checked={props.salespersonPhoneNumber.active == element.sales_phone_number_id}
                        onChange={handleChange}
                        value={element.sales_phone_number_id}
                        name="radio-button-demo"
                        inputProps={{'aria-label': element.number_description}}
                        title={element.number}
                    />
                    {element.number_description}
                </div>
            )} catch(e) {console.log(e)}
        }
    }
    return (
        <div >
            {numbers}
        </div>

    );
}


function mapStateToProps(state) {
    const {salespersonPhoneNumber} = state;

    return {
        salespersonPhoneNumber,
    };
}

const connected_component = connect(mapStateToProps);
const connectedSalesNumberPicker = connected_component(SalesNumberPicker);
export {connectedSalesNumberPicker as SalesNumberPicker};
