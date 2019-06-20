import {connect} from "react-redux";
import React, {Component} from 'react';
import {unstable_Box as Box} from "@material-ui/core/es/Box";
import {CallTab} from "../CallTab/CallTab"
import {SalesSettings} from "../SalesSettings/SalesSettings"
import {SalesAvgByWeek} from "../SalesDataTab/SalesDataTab"
class TabContents extends React.Component {

    render() {
        switch (this.props.ui.tabIndex) {
            case 0:
                return <Box><CallTab/></Box>;
            case 1:
                return <Box><SalesAvgByWeek client_code={"CT*EMB"}
                                            url={"https://us-east-1.online.tableau.com/t/fleurametz/views/fm_sales/clientdash?iframeSizedToWindow=true&:embed=y&:showAppBanner=false&:display_count=no&:showVizHome=no"}/></Box>;
            case 2:
                return <Box><SalesSettings/></Box>;
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
