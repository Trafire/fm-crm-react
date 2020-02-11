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

    function getTableauInfo(index) {
        const data = [
            {
                label: "Weekly Sale Trend",
                url: "https://us-east-1.online.tableau.com/t/fleurametz/views/ClientSalesCRM/WeeklyComparison?iframeSizedToWindow=true&:embed=y&:showAppBanner=false&:display_count=no&:showVizHome=no&:origin=viz_share_link",
                userBased: false,
            },
            {
                label: "Sales By Month",
                url: "https://us-east-1.online.tableau.com/t/fleurametz/views/ClientSalesCRM/SalesByMonth?iframeSizedToWindow=true&:embed=y&:showAppBanner=false&:display_count=no&:showVizHome=no&:origin=viz_share_link",
                userBased: false,
            },
            {
                label: "Average Order Size",
                url: "https://us-east-1.online.tableau.com/t/fleurametz/views/ClientSalesCRM/AverageOrderSize?iframeSizedToWindow=true&:embed=y&:showAppBanner=false&:display_count=no&:showVizHome=no&:origin=viz_share_link",
                userBased: false,
            },
            {
                label: "Calls Answer Ratio",
                url: "https://us-east-1.online.tableau.com/t/fleurametz/views/clientcalls/CallAnswered?iframeSizedToWindow=true&:embed=y&:showAppBanner=false&:display_count=no&:showVizHome=no&:origin=viz_share_link",
                userBased: false,
            },
            {
                label: "Calls By Time of Day",
                url: "https://us-east-1.online.tableau.com/t/fleurametz/views/clientcalls/CallAnsweredByTime?iframeSizedToWindow=true&:embed=y&:showAppBanner=false&:display_count=no&:showVizHome=no&:origin=viz_share_link",
                userBased: false,
            },
            {
                label: "Sales By Year",
                url: "https://us-east-1.online.tableau.com/t/fleurametz/views/SalesTotals/ClientSalesByYear?iframeSizedToWindow=true&:embed=y&:showAppBanner=false&:display_count=no&:showVizHome=no&:origin=viz_share_link",
                userBased: true,
            },
            {
                label: "Sales By Month",
                url: "https://us-east-1.online.tableau.com/t/fleurametz/views/SalesTotals/ClientSalesByMonth?iframeSizedToWindow=true&:embed=y&:showAppBanner=false&:display_count=no&:showVizHome=no&:origin=viz_share_link",
                userBased: true,
            },
            {
                label: "Sales By Week",
                url: "https://us-east-1.online.tableau.com/t/fleurametz/views/SalesTotals/ClientSalesByWeek?iframeSizedToWindow=true&:embed=y&:showAppBanner=false&:display_count=no&:showVizHome=no&:origin=viz_share_link",
                userBased: true,
            },
            {
                label: "Top 10",
                url: "https://us-east-1.online.tableau.com/t/fleurametz/views/SalesTotals/Top10?iframeSizedToWindow=true&:embed=y&:showAppBanner=false&:display_count=no&:showVizHome=no&:origin=viz_share_link",
                userBased: true,
            },
            {
                label: "Sales By Postal Code",
                url: "https://us-east-1.online.tableau.com/t/fleurametz/views/SalesTotals/SalesByPostalCode?iframeSizedToWindow=true&:embed=y&:showAppBanner=false&:display_count=no&:showVizHome=no&:origin=viz_share_link",
                userBased: true,
            },
            {
                label: "Sales Difference By Year",
                url: "https://us-east-1.online.tableau.com/t/fleurametz/views/ClientSalesCRM/SalesdifferencebyYear?iframeSizedToWindow=true&:embed=y&:showAppBanner=false&:display_count=no&:showVizHome=no&:origin=viz_share_link",
                userBased: false,
            },
        ];
        return data[index];
    }

    function handleChangeIndex(index) {
        setValue(index);
    }

    const tabs = [1,10,0,2,3,4,5,6,7,8,9];

    const tabLabels = [];
    const tabContents = [];

    for (let i = 0; i < tabs.length; i++) {
        const index = tabs[i];
        const label = getTableauInfo(index).label;
        const url = getTableauInfo(index).url;
        const userBased = getTableauInfo(index).userBased;
        tabLabels.push(<Tab label={label}/>);
        tabContents.push(
            <TabContainer dir={0}>
                <SalesData url={url} userBased={userBased} userID={props.user.user.id} clientCode={props.client.activeClient}
                           index={i}/>
            </TabContainer>
        );
    }

    return (
        <div>
            <AppBar position="static" color="default">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="scrollable"
                    scrollButtons="auto"
                >
                    {tabLabels}
                </Tabs>
            </AppBar>
            <SwipeableViews
                index={value}
                onChangeIndex={handleChangeIndex}
                style={{width: 1300}}
            >
                {tabContents}
            </SwipeableViews>
        </div>
    );
}


class SalesData extends Component {

    render() {

        let url = this.props.url;
        let userFilter = this.props.userBased;

        if (userFilter) {
            return (
                <div>
                    <div>
                        <UserNameFiltered userID={this.props.userID} url={url}/>
                    </div>
                </div>);
        }
        return (
            <div>
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
        hideToolbar: false,
        width: "1200px",
        height: "800px",
    };
    return (<div>
        <Viz2 url={url} options={options} clientCode={props.client_code}/>
    </div>)
}

function UserNameFiltered(props) {
    let url = props.url;
    let options = {
        "User Id": props.userID,
        hideTabs: true,
        hideToolbar: false,
        width: "1200px",
        height: "800px",
    };
    return (<div>
        <Viz2 url={url} options={options} clientCode={props.client_code}/>
    </div>)
}

function mapStateToProps(state) {
    const {client, authentication} = state;
    const {user} = authentication;

    return {
        client,
        user,

    };
}

const connected_component = connect(mapStateToProps);
const connectedVizList = connected_component(VizList);
export {connectedVizList as VizList};
