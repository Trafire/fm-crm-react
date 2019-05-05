import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {connect} from "react-redux";


export class ContactCard extends React.Component {
    render () {
        return (
            <CardContent>
                <Typography color="textSecondary" gutterBottom>
                    Contact Card
                </Typography>



            </CardContent>

        );
    }
}


function mapStateToProps(state) {
    const {client} = state;

    return {
        clientDetails: client.clientDetails,
        activeClient: client.activeClient,
    };
}

const connected_component = connect(mapStateToProps);
const connectedContactCard = connected_component(ContactCard);
export {connectedContactCard as ContactCard};
