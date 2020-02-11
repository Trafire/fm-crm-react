import React, {useState, useEffect} from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from "@material-ui/core/Box";
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import MenuIcon from '@material-ui/icons/Menu';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import StarIcon from '@material-ui/icons/Star';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {makeStyles, useTheme} from '@material-ui/core/styles';

import {Overview} from "../BuyerOverview/BuyerOverview";
import {ErrorBoundary} from "../ErrorHandling/ErrorBoundary";
import {Pricing, PricingTable} from "../Pricing";
import {OpenOrdersSelector} from "../BuyerOpenOrders/BuyerOpenOrders"
import {MyPdf} from "../Pdf/Pdf";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    appBar: {
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));

export function ResponsiveDrawer(props) {

    const menuOptions = ['Overview', 'Open Orders', 'Pricing','Pricing2'];

    const {container} = props;
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [windowShown, setWindowShown] = useState(menuOptions[0]);
    const [weekDate, setWeekDate] = useState(new Date());


    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };


    const drawer = (
        <div>
            <div className={classes.toolbar}/>
            <Divider/>
            <List>
                {menuOptions.map((text, index) => (
                    <ListItem button key={text} onClick={() => setWindowShown(text)}>
                        <ListItemIcon>{[<StarIcon/> , <AddShoppingCartIcon/> , <MonetizationOnIcon/>][index % 3]}</ListItemIcon>
                        <ListItemText primary={text}/>
                    </ListItem>
                ))}
            </List>
            <Divider/>

        </div>
    );
    let frame = '';
    switch (windowShown) {
        case 'Overview':
            frame = <Overview/>;
            break;
        case 'Open Orders':
            frame = <OpenOrdersSelector weekDate={weekDate} setWeekDate={setWeekDate} />;
            break;
        case 'Pricing':
            frame = <Box><ErrorBoundary><Pricing/> </ErrorBoundary></Box>;
            break;
        case 'Pricing2':
            frame = <Box><MyPdf/> </Box>;
            break;
    }
    return (
        <div className={classes.root}>
            <CssBaseline/>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        className={classes.menuButton}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        Buyer Interface
                    </Typography>
                </Toolbar>
            </AppBar>
            <nav className={classes.drawer} aria-label="mailbox folders">

                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Hidden smUp implementation="css">
                    <Drawer
                        container={container}
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                    <Drawer
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        variant="permanent"
                        open
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
            </nav>
            <main className={classes.content}>
                <div className={classes.toolbar}/>
                <Typography paragraph>
                    {frame}
                </Typography>

            </main>
        </div>
    );
}



