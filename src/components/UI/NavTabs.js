import React from "react";
import {uiActions} from "../../actions";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {connect} from "react-redux";

class NavTabs extends React.Component {

    handleChange = (event, value) => {
        this.props.dispatch(uiActions.setTab(value));
    };

    render() {
        return (<Tabs value={this.props.ui.tabIndex} onChange={this.handleChange}>

            <Tab label="Calls"/>
            <Tab label="Sales Data"/>
            <Tab label="Nothing"/>
            <Tab label="Client Settings"/>
        </Tabs>)
    }
}


function mapStateToProps(state) {
    const {ui} = state;

    return {
        ui,
    };
}

const connected_component = connect(mapStateToProps);
const connectedNavTabs = connected_component(NavTabs);
export {connectedNavTabs as NavTabs};
