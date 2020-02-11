import React, {useState, useEffect} from 'react';
import {openOrdersService} from "../../services/openOrders.service"
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import {SearchField} from "../Widgets/SearchField";
import {weekOfYear} from "../Dates/dates";
import {TimeAgo} from '../BuyerOverview/BuyerOverview'
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {WeekSlider} from "../Dates/dates";
import Checkbox from '@material-ui/core/Checkbox';
import {SimpleMenu} from '../Tables/Tables'

const style = {
    margin: 5,
    padding: 25,
};


const consolidateOrders = (orders) => {
    const combinedOrders = {};

    for (let i = 0; i < orders.length; ++i) {
        const item = orders[i];

        const key = `${item.category}, ${item.variety}, ${item.colour}, ${item.grade}`;

        if (!combinedOrders.hasOwnProperty(key)) {
            combinedOrders[key] = {
                category: item.category,
                variety: item.variety,
                colour: item.colour,
                grade: item.grade,
                quantity: 0,
                comment: '',
                supplier_code: item.supplier_code
            }
        }
        combinedOrders[key].quantity += item.quantity;
        if (item.comment != '') {
            combinedOrders[key].comment += ('(' + item.quantity + '- ' + item.client_code + ': ' + item.comment + ')' + ' ');
        }
    }
    const newOrders = Object.keys(combinedOrders).map(i => combinedOrders[i]);

    return newOrders;
};

export const LastUpdated = (props) => {

    const [openOrder, setOpenOrder] = useState(0);
    const [lastRun, setLastRun] = useState(new Date('1970'));
    const minute = new Date().getMinutes();
    useEffect(
        () => {
            openOrdersService.getNumberOfOpenOrders(props.week, props.year)
                .then(
                    open_orders => {
                        setOpenOrder(open_orders.open_orders);
                        setLastRun(new Date(open_orders.last_run));
                    }
                )
        }, [minute]
    );
    return <span> last updated <TimeAgo lastRun={lastRun}/></span>
};

export const OpenOrdersSelector = (props) => {
    const setWeekDate = props.setWeekDate;
    const weekDate = props.weekDate;
    const [dayNum, setDayNum] = React.useState([0, 6]);
    const [keyword, setKeyword] = useState('');
    const [consolidated, setConsolidated] = useState(false);

    const plusWeek = () => {
        setWeekDate(new Date(weekDate.getTime() + 7 * 24 * 60 * 60 * 1000));
    };

    const minusWeek = () => {
        setWeekDate(new Date(weekDate.getTime() - 7 * 24 * 60 * 60 * 1000));
    };

    const week = weekOfYear(weekDate);
    const year = weekDate.getFullYear();


    return (
        <div>
            <h1>
                Week {week}
            </h1>
            <h5><LastUpdated key={week} year={year} week={week}/></h5>

            <button onClick={minusWeek}> Previous Week</button>
            <button onClick={plusWeek}> Next Week</button>
            <OpenOrder key={week}
                       year={year}
                       week={week}
                       keyword={keyword}
                       setKeyword={setKeyword}
                       consolidated={consolidated}
                       setConsolidated={setConsolidated}
                       dayNum={dayNum}
                       setDayNum={setDayNum}
            />
        </div>
    );
};


function sortProducts(a, b, level = 0) {
    const headings = ['category', 'variety', 'colour', 'grade', 'Client Code', 'Order Date'];
    if (a[headings[level]] > b[headings[level]]) {
        return 1;
    } else if (a[headings[level]] < b[headings[level]]) {
        return -1;
    } else {
        if (level < headings.length) {
            return sortProducts(a, b, level + 1)
        }
    }
    return 0;
}

export const OpenOrder = (props) => {
    const [openOrder, setOpenOrder] = useState([]);
    const [rowsPerPage, setRowsPerPage] = React.useState(50);
    const [page, setPage] = React.useState(0);
    const keyword = props.keyword;
    const setKeyword = props.setKeyword;
    const minute = new Date().getMinutes();

    const handleKeywordChange = (text) => {
        setKeyword(text);
        setPage(0);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const flipSwitch = event => {
        props.setConsolidated(!(props.consolidated));
        setPage(0);
    };


    const dayNum = props.dayNum;
    const setDayNum = props.setDayNum;

    const handleChange = (event, newValue) => {
        setDayNum(newValue);
    };

    useEffect(
        () => {
            openOrdersService.getOpenOrders(props.week, props.year)
                .then(
                    open_orders => {

                        setOpenOrder(open_orders);
                    }
                )
        }, [minute]
    );
    let display = [];
    const orders = [];
    let header = null;
    let combineText = '';
    display = openOrder.filter(function (order) {
        const num = new Date(order.order_date).getDay() + 1;

        return ((num >= dayNum[0]) && (num <= dayNum[1]));

    });
    const register = [];


    if (!props.consolidated) {
        combineText = 'Combine Orders';
        header = (<TableHead>
            <TableRow>
                <TableCell padding="checkbox"><SelectAllCheckBox register={register}/></TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Variety</TableCell>
                <TableCell>Colour</TableCell>
                <TableCell>Grade</TableCell>
                <TableCell>Client Code</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Order Date</TableCell>
                <TableCell>Supplier Code</TableCell>
                <TableCell>Comment</TableCell>
            </TableRow>
        </TableHead>);


        display = display.filter(function (order) {
                if (keyword === '') {
                    return true;
                } else {
                    const order_string = Object.values(order).join(" ");
                    return order_string.toUpperCase().trim().includes(keyword.toUpperCase().trim());
                }

            }
        );
        display.sort(sortProducts);


        (rowsPerPage > 0
                ? display.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : display
        ).map((item, index) => (
            orders.push(
                <TableRow key={Object.values(item).join(" ")}>
                    <TableCell padding="checkbox"><OrdersCheckBox data={item} register={register}/></TableCell>
                    <TableCell> {item.category}</TableCell>
                    <TableCell> {item.variety}</TableCell>
                    <TableCell> {item.colour}</TableCell>
                    <TableCell> {item.grade}</TableCell>
                    <TableCell> {item.client_code}</TableCell>
                    <TableCell> {item.quantity}</TableCell>
                    <TableCell> {item.order_date}</TableCell>
                    <TableCell> {item.supplier_code}</TableCell>
                    <TableCell> {item.comment}</TableCell>
                </TableRow>)
        ));

    } else {
        combineText = 'Seperate Orders';

        const combinedOrders = consolidateOrders(display);

        display = combinedOrders.filter(function (order) {
                if (keyword === '') {
                    return true;
                } else {
                    const order_string = Object.values(order).join(" ");
                    return order_string.toUpperCase().trim().includes(keyword.toUpperCase().trim());
                }

            }
        );
        display.sort(sortProducts);

        header = (<TableHead>
            <TableRow>
                <TableCell padding="checkbox"><SelectAllCheckBox register={register}/></TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Variety</TableCell>
                <TableCell>Colour</TableCell>
                <TableCell>Grade</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Supplier Code</TableCell>
                <TableCell>Comment</TableCell>
            </TableRow>
        </TableHead>);


        (rowsPerPage > 0
                ? display.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : display
        ).map((item, index) => (
            orders.push(
                <TableRow key={Object.values(item).join(" ")}>
                    <TableCell padding="checkbox"><OrdersCheckBox data={item} register={register}/></TableCell>
                    <TableCell> {item.category}</TableCell>
                    <TableCell> {item.variety}</TableCell>
                    <TableCell> {item.colour}</TableCell>
                    <TableCell> {item.grade}</TableCell>
                    <TableCell> {item.quantity}</TableCell>
                    <TableCell> {item.supplier_code}</TableCell>
                    <TableCell> {item.comment}</TableCell>
                </TableRow>)
        ));
    }


    return (
        <Paper>
            <TableContainer component={Paper}>
                <SimpleMenu data={register}/>
                <div style={style}>
                    <FormControlLabel

                        control={
                            <Switch checked={props.consolidated} onChange={flipSwitch}/>
                        }
                        label={combineText}
                    />
                    <WeekSlider handleChange={handleChange} value={dayNum}/>

                    <SearchField keyword={keyword} label={'Search Products'} onChange={handleKeywordChange}/>
                </div>



                <Table stickyHeader >

                    {header}
                    <TableBody>

                        {orders}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25, 50, 100, 200, 300, 500]}
                component="div"
                count={display.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Paper>
    )
};

const OrdersCheckBox = (props) => {
    const [selected, setSelected] = useState(false);
    props.register.push(
        {
            'data': props.data,
            'setSelected': setSelected,
            'selected': selected,
        }
    );
    const handleChange = () => {
        setSelected(!selected);
    };
    return <Checkbox
        checked={selected}
        onChange={handleChange}
    />
};

const SelectAllCheckBox = (props) => {
    const [selected, setSelected] = useState(false);

    const handleChange = () => {
        setSelected(!selected);
        for (let i = 0; i < props.register.length; ++i) {
            props.register[i]['setSelected'](!selected);
        }
    };
    return <Checkbox
        checked={selected}
        onChange={handleChange}
    />
};
