import React, {Component} from 'react';

//import tableau from 'tableau-api';


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


export function SalesAvgByWeek(props) {
    let url = props.url;
    var options = {
        "Client Code": props.client_code,
        hideTabs: true,
        hideToolbar: true,
        width: "650px",
        height: "500px",
    };
    return (<div>
        <Viz2 url={url} options={options} clientCode={props.client_code}/>
    </div>)

}
