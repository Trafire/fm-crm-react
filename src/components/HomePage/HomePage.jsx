import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { salespersonActions } from '../../actions/salesperson.actions';


class HomePage extends React.Component {
    componentDidMount() {
        this.props.dispatch(salespersonActions.getByUserID(this.props.user.user.id));
    }


    render() {
        const { user, salesperson } = this.props;
        return (
            <div >

                <p>

                    {user.user.username}
                    {user.user.id}
                    <Link to="/login">Logout</Link>
                </p>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const {authentication, salesperson} = state;
    const { user } = authentication;
    return {
        user,
        salesperson,
    };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };
