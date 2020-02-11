import React, {useState, useEffect} from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

export function SimpleMenu(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const data = props.data;

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const EmailOrders = event => {
        let txt = "mailto:name1@rapidtables.com?cc=name2@rapidtables.com&bcc=name3@rapidtables.com&amp;subject=The%20subject%20of%20the%20email&amp;body=The%20body%20of%20the%20email&amp;subject=The%20subject%20of%20the%20email&amp;body=The%20body%20of%20the%20email";
        for (let i = 0; i < data.length; ++i) {
            if (data[i].selected) {
                console.log(data[i].data);
                const pdata = data[i].data;
                txt += pdata.category + '%20' + pdata.variety + pdata.quantity;
                txt = txt.replace(" ", "%20");
            }
        }
        window.location = txt;
        console.log(txt);
        handleClick(event);
    };

    return (
        <div>
            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                Open Menu
            </Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose}>Print Selected</MenuItem>
                <MenuItem onClick={EmailOrders}>Email Selected</MenuItem>

            </Menu>
        </div>
    );
}
