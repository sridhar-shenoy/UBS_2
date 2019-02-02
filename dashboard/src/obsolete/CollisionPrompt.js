import React from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import TypoGraphy from '@material-ui/core/Typography'
import CircularProgress from './CircularProgress.js'

class CollisionPrompt extends React.Component {
    success = () => {
        this.setState({promptState: 'button_success'})
    };
    collapsePrompt = () => {
        this.props.updateCollideId([]);
        this.setState({promptState: 'collapse'})
    };

    // initialising the promptState to determine change of the prompt
    constructor(props) {
        super(props);
        this.state = {value: '', promptState: ''}
    }

    renderProgress(typeOfID) {
        // console.log('here' + typeOfID)
        this.setState({promptState: 'button_clicked'});
        // do the query again or filter existing logs
        // but will sleep for 2s
        setTimeout(this.success, 2000);
        setTimeout(this.collapsePrompt, 2000);
        // the message 'your request has been updated' will now be shown in the notification bar(snack bar)
        setTimeout(this.props.callSnackBar, 2000, 'Your request has been updated')
    }

    render() {
        // console.log('start')
        // the state machine of the prompt
        if (this.state.promptState === 'button_clicked') {
            return (
                <div>
                    <CircularProgress/>
                </div>
            )
        } else if (this.state.promptState === 'button_success') {
            return (null)
        } else if (this.state.promptState === 'collapse') {
            this.setState({promptState: 'initialise'});
            return (null)
        } else {
            if (this.props.collide_type.length === 0) {
                return (null)
            } else if (this.props.collide_type.length === 2 || this.props.collide_type.length === 3) {
                return (
                    <div id="id_collision_container">
                        {this.props.collide_type.length === 2 ? <TypoGraphy variant='h5'>We have found the same ID
                                in {this.props.collide_type[0]} and {this.props.collide_type[1]}</TypoGraphy> :
                            <TypoGraphy variant='h5'>We have found the same ID
                                in {this.props.collide_type[0]}, {this.props.collide_type[1]} and {this.props.collide_type[2]}</TypoGraphy>}
                        <TypoGraphy variant='h5'>Which one is you referring?</TypoGraphy>
                        <List component='nav'>
                            {
                                this.props.collide_type.map((item, i) => (
                                    <ListItem
                                        button={true}
                                        title={item}
                                        onClick={() => this.renderProgress(i)}
                                    >
                                        <ListItemText primary={this.props.collide_type[i]}/>
                                    </ListItem>
                                ))
                            }
                        </List>
                    </div>
                );
            } else {
                return '';
            }
        }
    }
}

export default CollisionPrompt;
