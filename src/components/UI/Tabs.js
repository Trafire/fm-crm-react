import {connect} from "react-redux";
import React, {Component} from 'react';
import {unstable_Box as Box} from "@material-ui/core/es/Box";
import {CallTab} from "../CallTab/CallTab"

class TabContents extends React.Component {

    render() {
        switch (this.props.ui.tabIndex) {
            case 0:
                return <Box><CallTab/></Box>;
            case 1:
                return <Box>1</Box>;
            case 2:
                return <Box>2</Box>;
            case 3:
                return <Box>3</Box>;

            default:
                return <Box>0</Box>;
        }
    }
}

function mapStateToProps(state) {
    const {ui} = state;

    return {
        ui,
    };
}

const connected_component = connect(mapStateToProps);
const connectedTabContents = connected_component(TabContents);
export {connectedTabContents as TabContents};
