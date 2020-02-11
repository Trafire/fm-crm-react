import React, {useState} from 'react';
import {useForm} from "../Forms/formHooks"
import {weeklyPricesActions} from "../../actions";
import TextField from "@material-ui/core/TextField";

export function PricingButton(props) {
    const setPrice = () => {
        props.dispatch(weeklyPricesActions.setPrice(props.id, props.year, props.week, props.assortment_code, inputs.price));
    };

    const {inputs, handleInputChange, handleSubmit} = useForm(setPrice);

    return (
        <div>
        <form onSubmit={handleSubmit}>
            <div>
                <TextField
                    type="integer"
                    label="price"
                    name="price"
                    onChange={handleInputChange}
                    value={inputs.price || ""}
                    required
                />
            </div>

            <button type="submit">Change Price</button>
        </form></div>
    );
}

