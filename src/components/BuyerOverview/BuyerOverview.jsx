import React, {useState, useEffect} from 'react';
import {FormatDate, weekOfYear} from "../Dates/dates";

import {openOrdersService, getNumberOfUnpriced} from "../../services/openOrders.service"
import {weeklyPriceService} from "../../services/weeklyPrices.service";

import {sendMail} from "../Email/Email"

export const TimeAgo = (props) => {
    const lastRun = props.lastRun;
    if (lastRun == null) {
        return <span>'I dunno yet'</span>;
    }
    const time = lastRun.toLocaleTimeString();
    const today = new Date();
    today.setSeconds(0);
    today.setMinutes(0);
    today.setHours(0);
    lastRun.setSeconds(0);
    lastRun.setMinutes(0);
    lastRun.setHours(0);
    lastRun.setMilliseconds(0);
    const days = Math.round((today - lastRun) / (1000 * 60 * 60 * 24));

    let day_description = '';
    if (days === 0) {
        day_description = "Today";
    } else if (days === 1) {
        day_description = "Yesterday";
    } else if (days > 1000) {
        return "Never";
    } else if (days < 5) {
        const weekdays = [
            "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
        ];
        day_description = weekdays[lastRun.getDay()];
    } else {
        day_description = `${days} days ago`;
    }

    return <span>{day_description} at {time}</span>;
};

const ToDistribute = (props) => {
    const [toDistribute, setToDistribute] = useState(0);
    const minute = new Date().getMinutes();
    useEffect(
        () => {
            openOrdersService.getOrdersInShipment(props.week, props.year)
                .then(
                    quantity => {
                        setToDistribute(quantity.quantity);

                    }
                )

        }, [minute]
    );
    return <span> <b>{toDistribute}</b> Items Need to be Distributed </span>
};


const OpenOrders = (props) => {
    const [openOrder, setOpenOrder] = useState(0);
    const [lastRun, setLastRun] = useState(new Date('1970'));
    const minute = new Date().getMinutes();
    useEffect(
        () => {
            openOrdersService.getNumberOfOpenOrders(props.week, props.year)
                .then(
                    open_orders => {
                        setOpenOrder(open_orders.open_orders);
                        setLastRun(new Date(open_orders.last_run));
                    }
                )
        }, [minute]
    );
    return <span> last updated <TimeAgo lastRun={lastRun}/><br/><b>{openOrder} </b> orders are open</span>
};


const UnpricedProdicts = (props) => {
    const [products, setProducts] = useState(0);
    const minute = new Date().getMinutes();
    useEffect(
        () => {
            weeklyPriceService.getNumberOfUnpriced (props.week, props.year)
                .then(
                    quantity => {
                        setProducts(quantity.quantity);

                    }
                )
        }, [minute]
    );
    return <span> <b>{products}</b> Items Need to be priced </span>
};

const WeekData = (props) => {
    return <div>
        <OpenOrders week={props.week} year={props.year}/><br/>
        <ToDistribute week={props.week} year={props.year}/><br/>
        <UnpricedProdicts week={props.week} year={props.year}/><br/>
    </div>
};
export const Overview = () => {

    const weeks = [];

    for (let i = 0; i < 8; i++) {
        const days = i * 7;
        const day = new Date(new Date().setDate(new Date().getDate() + days));
        const week = weekOfYear(day);
        const year = day.getFullYear();

        weeks.push(
            <div key={week}>
                <button onClick={sendMail}>Mail</button>
                <h3>Week {week}-{year}</h3>
                <p><WeekData week={week} year={year}/></p>

            </div>
        );

    }


    return <div>
        <h1>Overview </h1>

        <div>
            {weeks}
        </div>
    </div>
};
