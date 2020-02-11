import React from "react";
import ReactDOM from 'react-dom'
import {connect} from "react-redux";
import {assortmentActions, weeklyPricesActions} from "../../actions";
import {AssortmentProperty} from "../Assortment/AssortmentProperty"
import {AssortmentRow} from "../Assortment/Assortment";
import {PricingButton} from "./PricingButton";
import Switch from '@material-ui/core/Switch';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {AssortmentInfo} from "./PricingArticleInfo"
import {Overview} from "../BuyerOverview/BuyerOverview";
import TextField from "@material-ui/core/TextField";

const priceDiv = {
        'border-style': 'solid',
        'border-width': '1px',
        'margin': '2px',
    }
;

function SearchField(props) {
    console.log(props);
    return (<TextField
        id="standard-name"
        label="Search products"
        onChange={event => props.onChange(event.target.value)}
        margin="normal"
        variant="outlined"
        fullWidth
    />)
}


const weekOfYear = function (date) {
    var d = new Date(+date);
    d.setHours(0, 0, 0);
    d.setDate(d.getDate() + 4 - (d.getDay() || 7));
    return Math.ceil((((d - new Date(d.getFullYear(), 0, 1)) / 8.64e7) + 1) / 7);
};

class Pricing extends React.Component {
    constructor(props) {
        super(props);
        for (let i = -3; i < 4; i++) {
            const days = i * 7;
            const day = new Date(new Date().setDate(new Date().getDate() + days));
            let week = weekOfYear(day);
            let year = day.getFullYear();
            this.props.dispatch(weeklyPricesActions.getUnpricedByWeek(year, week));
        }


        this.sort_function = this.sort_function.bind(this);
        this.sort_function2 = this.sort_function2.bind(this);
        this.back = this.back.bind(this);
        this.forward = this.forward.bind(this);

        this.toggle_priced = this.toggle_priced.bind(this);
        this.state = {day: new Date(), unpriced: true, keyword: ''};

        this.onChange = this.onChange.bind(this);
        this.filter_product = this.filter_product.bind(this);
    }

    onChange(value) {
        this.setState({'keyword': value});
    }

    toggle_priced(e) {
        this.setState({unpriced: !this.state.unpriced});
    }

    back(e) {
        this.setState({day: new Date(this.state.day.setDate(this.state.day.getDate() - 7))});
        this.props.dispatch(weeklyPricesActions.getUnpricedByWeek(this.state.day.getFullYear(), weekOfYear(this.state.day)));
    }

    forward(e) {
        this.setState({day: new Date(this.state.day.setDate(this.state.day.getDate() + 7))});

        this.props.dispatch(weeklyPricesActions.getUnpricedByWeek(this.state.day.getFullYear(), weekOfYear(this.state.day)));
    }

    filter_product(e) {
        const code = e.assortment_code;

        if (this.props.assortment.hasOwnProperty(code)) {
            const product = this.props.assortment[code];
            const string = `${product.category_name} ${product.name} ${product.colour} ${product.grade}`
            if (this.state.keyword === '') {
                return true;
            } else {
                return string.toUpperCase().trim().includes(this.state.keyword.toUpperCase().trim());
            }
        }
        return false;

    }

    sort_function(a, b) {

        if (this.props.assortment.hasOwnProperty(a.assortment_code)) {
            try {
                if (this.props.assortment[a.assortment_code].name > this.props.assortment[b.assortment_code].name) {
                    return 1;
                }
            } catch {
                return -1;
            }
        }

        return -1;
    }

    sort_function2(a, b) {

        if (this.props.assortment.hasOwnProperty(a.assortment_code)) {

            try {
                return this.props.assortment[a.assortment_code].category_name.localeCompare(this.props.assortment[b.assortment_code].category_name);
            } catch {
                return -1;
            }
        }

        return -1;
    }

    render() {
        const year = this.state.day.getFullYear();
        const week = weekOfYear(this.state.day);
        if (this.props.weeklyPrices[year] && this.props.weeklyPrices[year][week]) {
            let data = this.props.weeklyPrices[year][week];
            data.sort(this.sort_function);
            data.sort(this.sort_function2);
            if (this.state.unpriced) {
                data = data.filter(assortment => !(assortment.price));
            }
            data = data.filter(this.filter_product);
            const listItems = data.map((items) =>
                <div style={priceDiv}>
                    <AssortmentRow key={items.id} id={items.id} price={items.price} code={items.assortment_code}
                                   year={year}
                                   week={week}
                                   dispatch={this.props.dispatch}
                                   ending_cells={[]} priceForm={true}/>


                    <AssortmentInfo code={items.assortment_code} year={year}
                                    week={week - 2}/>
                    <AssortmentInfo code={items.assortment_code} year={year}
                                    week={week - 1}/>

                    <AssortmentInfo code={items.assortment_code} year={year}
                                    week={week + 1}/>
                    <AssortmentInfo code={items.assortment_code} year={year}
                                    week={week + 2}/>

                </div>
            );

            return <div>

                <button onClick={this.back}>back</button>
                <button onClick={this.forward}>forward</button>
                Year : {this.state.day.getFullYear()}
                Week : {weekOfYear(this.state.day)}
                <div>
                    <SearchField onChange={this.onChange}/>
                </div>

                <Switch
                    checked={this.state.unpriced}
                    onChange={this.toggle_priced}
                    value="Only Unpriced"
                    inputProps={{'aria-label': 'secondary checkbox'}}
                />

                {listItems}


            </div>;
        }
        console.log(this.state.day);
        return (<div>


            <button onClick={this.back}>back</button>
            <button onClick={this.forward}>forward</button>
            <br/>

            Year : {this.state.day.getFullYear()}
            Week : {weekOfYear(this.state.day)}

            <Switch
                checked={this.state.unpriced}
                onChange={this.toggle_priced}
                value="Only Unpriced"
                inputProps={{'aria-label': 'secondary checkbox'}}
            />
        </div>);
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
    connectedPricing = connect(mapStateToProps)(Pricing);
export {
    connectedPricing as Pricing
};
