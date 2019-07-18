import {App} from './components/App';
import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import store from "./store";
import {ThemeProvider} from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { MuiThemeProvider } from '@material-ui/core/styles';
import orange from '@material-ui/core/colors/orange';



const theme = createMuiTheme({

    palette: {
        primary: {main: '#C90039'},
        secondary: {main:'#0199A9'},
    },
    typography: {
        fontFamily: [
            '"Helvetica Neue"',
            'Arial',
        ].join(','),
    },

});

render(
    <Provider store={store}>
        <MuiThemeProvider theme={theme}>
            <App/>
        </MuiThemeProvider>
    </Provider>,
    document.getElementById('root')
);
