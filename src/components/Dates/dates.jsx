import React from "react";
import {makeStyles} from '@material-ui/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Tooltip from '@material-ui/core/Tooltip';
import TextField from '@material-ui/core/TextField';
import {connect} from "react-redux";
import {clientActions} from "../../actions";
import Slider from "@material-ui/core/Slider";

// A style sheet
const useStyles = makeStyles({
        root: {
            border: 0,
            borderRadius: 3,
            boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .3)',
            margin: "5px",
            width: 325,
        },
        header: {
            background: '#88cdd4',
            textAlign: 'center',
        },
        main: {

            textAlign: 'center',
            color: '#78b74a',
            fontSize: '40px',


        },

        footer: {
            background: '#f6aa42',
            textAlign:
                'center',
            fontSize:
                '20px',
        },
        container: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        textField: {
            width: 200,
            spacing: 1,
        },

    })
;
export const WeekSlider = (props) => {
    const handleChange = props.handleChange;
    const valuetext = props.valuetext;
    const value = props.value;

    const marks = [
        {
            value: 0,
            label: 'Sun'
        },
        {
            value: 1,
            label: 'Mon'
        },
        {
            value: 2,
            label: 'Tue'
        },
        {
            value: 3,
            label: 'Wed',
        },
        {
            value: 4,
            label: 'Thu',
        },
        {
            value: 5,
            label: 'Fri',
        },
        {
            value: 6,
            label: 'Sat',
        },
    ];

    return (<Slider
        value={value}
        valueLabelFormat={x => ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][x]}
        onChange={handleChange}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        min={0}
        max={6}
        marks={marks}

    />)
};

export function DisplayDate(props) {

    const displaydate = props.displaydate;
    const classes = useStyles(props);
    const month = props.displaydate.toLocaleString('default', {month: 'short'});
    const day = props.displaydate.toLocaleString('default', {day: 'numeric'});
    const year = props.displaydate.toLocaleString('default', {year: 'numeric'});
    const time = props.displaydate.toLocaleString('default', {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
    });
    const weekday = props.displaydate.toLocaleString('default', {weekday: "long"});


    return (
        <div>

            <Card className={classes.root}>
                <div className={classes.header}>{props.title}</div>
                <Tooltip title={props.tip}>
                    <CardContent className={[classes.main]}>
                        <DatePicker clickable={props.clickable} clientCode={props.clientCode}
                                    displayDate={displaydate}/>
                    </CardContent>
                </Tooltip>

                <div className={classes.footer}>
                    {weekday} - {time}
                </div>
            </Card>
        </div>);

}


class DatePicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            setDate: false,
        };
        this.handleClick = this.handleClick.bind(this);
        //this.handleChange = this.handleChange.bind(this);

    }

    /*handleChange(e, date) {
        console.log(e);
        console.log(date);
    }*/

    handleClick() {
        if (this.props.clickable) {
            this.setState({setDate: !this.state.setDate})
        }
    }

    componentWillReceiveProps(props) {
        const {clientCode, displayDate} = this.props;
        if (props.clientCode !== clientCode) {
            this.setState({setDate: false})
        }
    }

    render() {
        let tzoffset = (new Date()).getTimezoneOffset() * 60000;
        if (!this.state.setDate) {
            const month = this.props.displayDate.toLocaleString('default', {month: 'short'});
            const day = this.props.displayDate.toLocaleString('default', {day: 'numeric'});
            return <div onDoubleClick={this.handleClick}> {month} {day} </div>;
        } else {
            return (
                <div onDoubleClick={this.handleClick}>
                    <DateField clientCode={this.props.clientCode}
                               dateStr={new Date(this.props.displayDate - tzoffset).toISOString().slice(0, 16)}/>
                </div>);
        }
    }
}

const datePickerStyle = {
    width: 250,
    "& input::-webkit-clear-button, & input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
        display: "none"
    }
};

class DateField extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.initial_datestr = this.props.dateStr;

    }

    handleChange(e, date) {

        let d = new Date(date.target.value);
        this.props.dispatch(clientActions.setNextCallTime(this.props.client.activeClient, d));
        return d;
    }

    render() {
        return (
            <TextField
                style={datePickerStyle}
                //key={this.props.dateStr}
                onChange={(event) => this.handleChange("call", event)}
                id="datetime-local"
                type="datetime-local"
                defaultValue={this.initial_datestr}//"2017-05-24T10:30"
                InputLabelProps={{
                    shrink: true,
                }}
            />
        );
    }
}

export const weekOfYear = function (date) {
    var d = new Date(+date);
    d.setHours(0, 0, 0);
    d.setDate(d.getDate() + 4 - (d.getDay() || 7));
    let sunday = 0;
    if (d.getDay() === 0) {
        sunday = 1;
    }
    return sunday + Math.ceil((((d - new Date(d.getFullYear(), 0, 1)) / 8.64e7) + 1) / 7);
};

export function FormatDate(d) {
    if (d == null) {
        d = new Date();
    }

}

function mapStateToProps(state) {
    const {client} = state;

    return {
        client,
    };
}


const connected_component = connect(mapStateToProps);
DateField = connected_component(DateField);


