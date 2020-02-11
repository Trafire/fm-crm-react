/*import React from 'react';
import './App.css';

const App = ({ callList }) =>
    <div className="app">
        {callList.clientIndex}
    </div>
export default App;
*/
import React from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from '../helpers/history';
import { alertActions } from '../actions';
import { PrivateRoute } from './PrivateRoute';
import { HomePage } from './HomePage/HomePage';
import { LoginPage } from './LoginPage/LoginPage';
import { RegisterPage } from './RegisterPage/RegisterPage';
import {DataManager} from "./DataManager/DataManager";
import { Overview } from "./BuyerOverview/BuyerOverview"
import { ResponsiveDrawer } from "./BuyerPage/BuyerPage"


class App extends React.Component {
    constructor(props) {
        super(props);
        const { dispatch } = this.props;
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
    }

    render() {
        const { alert } = this.props;
        return (
            <div className="jumbotron">
                <div className="container">
                    <div className="col-sm-8 col-sm-offset-2">
                        {alert.message &&
                        <div className={`alert ${alert.type}`}>{alert.message}</div>
                        }
                        <Router history={history}>
                            <div>
                                <DataManager/>
                                <PrivateRoute exact path="/" component={HomePage} />
                                <PrivateRoute exact path="/buyer" component={ResponsiveDrawer} />
                                <Route path="/login" component={LoginPage} />
                                <Route path="/register" component={RegisterPage} />

                            </div>
                        </Router>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { alert } = state;
    return {
        alert
    };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App };
