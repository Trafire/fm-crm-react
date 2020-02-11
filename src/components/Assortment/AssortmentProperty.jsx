import {connect} from "react-redux";
import React from "react";
import {assortmentActions} from "../../actions";



class AssortmentProperty extends React.Component {

    constructor(props) {
        super(props);
        if (!this.props.assortment.hasOwnProperty(this.props.code)) {
            this.props.dispatch(assortmentActions.getAssortment(this.props.code));
        }

    }


    render() {

        const item = this.props.assortment[this.props.code];
        if (item) {
            const data = item[this.props.property];
            return <span>{data}</span>
        }


        return <span/>;
    }

}


function mapStateToProps(state) {
    const {assortment} = state;

    return {
        assortment,
    };
}

const connected_component = connect(mapStateToProps);
const connectedAssortmentProperty = connected_component(AssortmentProperty);
export {connectedAssortmentProperty as AssortmentProperty};
