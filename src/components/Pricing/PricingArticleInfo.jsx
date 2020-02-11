import {connect} from "react-redux";
import React from "react";

function AssortmentInfo(props) {
    let data = {};
    if (props.weeklyPrices.hasOwnProperty(props.year) && props.weeklyPrices[props.year].hasOwnProperty(props.week)) {
        data = getSellingPrice(props.code, props.year, props.week, props.weeklyPrices);
    }
    if (!(data.hasOwnProperty('price'))) {
        data = {price:'0.00'};
    }
    return (
        <li>
            Price for Week {props.week}: ${data.price}
        </li>)
}

function getSellingPrice(code, year, week, prices) {
    if (prices.hasOwnProperty(year) && prices[year].hasOwnProperty(week) ) {
        let data = prices[year][week];
        const d =  data.find(function (element) {
            return element.assortment_code === code;
        });
        console.log(d);
        if (d ) {



            return d;
        }
        return {price: '0.00'};
    }

}


function mapStateToProps(state) {
    const {assortment, weeklyPrices} = state;
    return {
        assortment,
        weeklyPrices,
    };
}

const
    connectedAssortmentInfo= connect(mapStateToProps)(AssortmentInfo);
export {
    connectedAssortmentInfo as AssortmentInfo
};
