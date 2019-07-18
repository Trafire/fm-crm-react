import React from "react";
import {makeStyles} from '@material-ui/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import {red} from '@material-ui/core/colors';
import Tooltip from '@material-ui/core/Tooltip';
import TextField from '@material-ui/core/TextField';
import {connect} from "react-redux";
import {clientActions} from "../../actions";

// A style sheet
const useStyles = makeStyles({
        root: {
            background: 'red',
            border: 0,
            borderRadius: 3,
            boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .3)',
            margin: "5px",
            width: 220,
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
                '12px',
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

                        <DatePicker clientCode={props.clientCode} displayDate={displaydate}/>
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
        this.handleChange = this.handleChange.bind(this);

    }

    handleChange(e, date) {
        console.log(e);
        console.log(date);
    }

    handleClick() {
        this.setState({setDate: !this.state.setDate})
    }

    componentWillReceiveProps(props) {
        const {clientCode, displayDate} = this.props;
        if (props.clientCode !== clientCode) {
            this.setState({setDate: false})
        }
    }

    render() {

        if (!this.state.setDate) {
            const month = this.props.displayDate.toLocaleString('default', {month: 'short'});
            const day = this.props.displayDate.toLocaleString('default', {day: 'numeric'});
            return <div onDoubleClick={this.handleClick}> {month} {day} </div>;
        } else {
            console.log(this.props.displayDate);
            return (
                <div onDoubleClick={this.handleClick}>
                    <DateField dateStr={this.props.displayDate.toISOString().slice(0, 16)}/>

                </div>);
        }
    }
}

class DateField extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e, date) {
        let d = new Date(date.target.value);
        this.props.dispatch(clientActions.setNextCallTime(this.props.client.activeClient,d.toISOString()));
    }

    render() {
        return (
            <TextField
                key={this.props.dateStr}
                onChange={(event) => this.handleChange("call", event)}
                id="datetime-local"
                type="datetime-local"
                defaultValue={this.props.dateStr}//"2017-05-24T10:30"
                InputLabelProps={{
                    shrink: true,
                }}
            />
        );
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