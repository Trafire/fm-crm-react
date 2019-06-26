import React, {Component} from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import {connect} from "react-redux";

//import tableau from 'tableau-api';
//client_code={this.props.client.activeClient}
//url={"https://us-east-1.online.tableau.com/t/fleurametz/views/ClientSalesCRM/WeeklyComparison?iframeSizedToWindow=true&:embed=y&:showAppBanner=false&:display_count=no&:showVizHome=no&:origin=viz_share_link"}


function TabContainer({children}) {
    return (
        <Typography component="div" style={{padding: 8 * 3}}>
            {children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
    dir: PropTypes.string.isRequired,
};


function VizList(props) {

    const [value, setValue] = React.useState(0);

    function handleChange(event, newValue) {
        setValue(newValue);
    }

    function handleChangeIndex(index) {
        setValue(index);
    }

    return (
        <div>
            <AppBar position="static" color="default">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"

                >
                    <Tab label="Weekly Sale Trend"/>
                    <Tab label="Sales By Month"/>
                    <Tab label="Average Order Size"/>
                </Tabs>
            </AppBar>
            <SwipeableViews
                index={value}
                onChangeIndex={handleChangeIndex}
            >
                <TabContainer dir={0}><SalesData clientCode={props.client.activeClient} index={0}/></TabContainer>
                <TabContainer dir={0}><SalesData clientCode={props.client.activeClient} index={1}/></TabContainer>
                <TabContainer dir={0}><SalesData clientCode={props.client.activeClient} index={2}/></TabContainer>
            </SwipeableViews>
        </div>
    );
}


class SalesData extends Component {
    updateUrl() {
        let url;
        switch (this.state.index) {
            case 0:
                url = "https://us-east-1.online.tableau.com/t/fleurametz/views/ClientSalesCRM/WeeklyComparison?iframeSizedToWindow=true&:embed=y&:showAppBanner=false&:display_count=no&:showVizHome=no&:origin=viz_share_link";
                break;
            case 1:
                url = "https://us-east-1.online.tableau.com/t/fleurametz/views/ClientSalesCRM/SalesByMonth?iframeSizedToWindow=true&:embed=y&:showAppBanner=false&:display_count=no&:showVizHome=no&:origin=viz_share_link";
                break;
            default:
                url = "https://us-east-1.online.tableau.com/t/fleurametz/views/ClientSalesCRM/AverageOrderSize?iframeSizedToWindow=true&:embed=y&:showAppBanner=false&:display_count=no&:showVizHome=no&:origin=viz_share_link";
        }
        this.setState({url});
    }


    render() {
        let url;
        switch (this.props.index) {
            case 0:
                url = "https://us-east-1.online.tableau.com/t/fleurametz/views/ClientSalesCRM/WeeklyComparison?iframeSizedToWindow=true&:embed=y&:showAppBanner=false&:display_count=no&:showVizHome=no&:origin=viz_share_link";
                break;
            case 1:
                url = "https://us-east-1.online.tableau.com/t/fleurametz/views/ClientSalesCRM/SalesByMonth?iframeSizedToWindow=true&:embed=y&:showAppBanner=false&:display_count=no&:showVizHome=no&:origin=viz_share_link";
                break;
            default:
                url = "https://us-east-1.online.tableau.com/t/fleurametz/views/ClientSalesCRM/AverageOrderSize?iframeSizedToWindow=true&:embed=y&:showAppBanner=false&:display_count=no&:showVizHome=no&:origin=viz_share_link";
        }

        return (
            <div>Results are here:
                <div>
                    <SalesAvgByWeek client_code={this.props.clientCode} url={url}/>
                </div>

            </div>


        );
    }

}

export class Viz2 extends Component {
    constructor(props) {
        super(props);
        this.clear = this.clear.bind(this);
    }

    componentDidMount() {
        this.initViz()
    }

    componentDidUpdate(prevProps) {
        if (this.props.clientCode !== prevProps.clientCode) {
            this.clear();
            this.clear();
        }
    }

    initViz() {
        const vizUrl = this.props.url;
        const vizContainer = this.vizContainer;
        this.viz = new window.tableau.Viz(vizContainer, vizUrl, this.props.options);
    }

    clear() {
        let workbook = this.viz.getWorkbook();
        let activeSheet = workbook.getActiveSheet();
        activeSheet.applyFilterAsync("Client Code", this.props.clientCode, window.tableau.FilterUpdateType.REPLACE)
    }

    render() {

        return (
            <div>
                <div ref={(div) => {
                    this.vizContainer = div
                }}>
                </div>
            </div>
        )
    }
}


function SalesAvgByWeek(props) {
    let url = props.url;
    let options = {
        "Client Code": props.client_code,
        hideTabs: true,
        hideToolbar: true,
        width: "800px",
        height: "500px",
    };
    return (<div>
        <Viz2 url={url} options={options} clientCode={props.client_code}/>
    </div>)
}

function mapStateToProps(state) {
    const {client} = state;

    return {
        client,
    };
}

const connected_component = connect(mapStateToProps);
const connectedVizList = connected_component(VizList);
export {connectedVizList as VizList};
