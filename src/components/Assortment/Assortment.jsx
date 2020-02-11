import {AssortmentProperty} from "./AssortmentProperty";
import React from "react";
import {PricingButton} from "../Pricing/PricingButton";

const tdStyle = {
    padding: 10,
};

export function AssortmentRow(props) {
    const code = props.code;
    const columns = ["assortment_code", "category_name", "name", "colour", "grade","price"];
    const listItems = columns.map((heading) =>
        <td style={tdStyle}><AssortmentProperty code={code} property={heading}/></td>
    );
    let endItems = <span/>;
    if (props.hasOwnProperty('ending_cells')) {
        endItems = props.ending_cells.map((data) =>
            <td style={tdStyle}>{data}</td>
        );
    }
    if (props.priceForm) {
        endItems.push(<PricingButton id={props.id} dispatch={props.dispatch} year={props.year} week={props.week} assortment_code={props.assortment_code}/>)
    }

    let price = props.price;
    if (!(props.price)) {
        price = "0.00";
    }
    return (
        <tr>
            {listItems}
            <td>${price}</td>
            {endItems}
        </tr>
    );
}
