import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import SettingsIcon from '@material-ui/icons/Settings'
import DarkThemeSwitch from './utils/DarkThemeSwitch.js'
import FilterField from './FilterField'
import Paper from '@material-ui/core/Paper'
import {withStyles} from '@material-ui/core/styles'
import 'rodal/lib/rodal.css'
import Typography from '@material-ui/core/Typography'
import NoSsr from '@material-ui/core/NoSsr'
import Modal from '@material-ui/core/Modal'
import ControlPanel from './utils/ControlPanel.js'

// const customStyles={ height: 'auto', bottom: 'auto', top: '50%', transform: 'translateY(-60%)', width: '30% ', maxHeight: '60%', overflow: 'auto' };

const styles = theme => ({
    paperContent : {
        position: 'absolute',
        height: 'auto',
        bottom: 'auto',
        top: '50%',
        left: '50%',
        width: '30%',
        transform: 'translate(-50%, -50%)',
        padding: theme.spacing.unit * 3,
        backgroundColor: theme.palette.background.paper
    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary
    },
    Control: {
        padding: theme.spacing.unit * 2
    }
});

/**
 * This is the pop up modal of the setting button
 */
class SettingsButton extends React.Component {
    constructor(props) {
        super(props);
        this.props.onRef(this);
        this.state = {
            visible: false,
        }
        // this.handleOpen = this.handleOpen.bind(this)
    }

    confirmChange = () => {
        console.log('Change This Plz')
    };

    handleOpen = () => {
        this.setState({visible: true})
    };

    handleClose = () => {
        this.setState({visible: false})
    };

    render() {
        const { classes } = this.props;
        return (
            <div>
                <IconButton color='inherit' onClick={this.handleOpen.bind(this)}>
                    <SettingsIcon />
                </IconButton>
                <Modal
                    open={this.state.visible}
                    onClose={this.handleClose.bind(this)}
                >
                    <NoSsr>
                        <Paper className={classes.paperContent}>
                            <Typography variant='title'>Theme Setting:</Typography>
                            {/*<SessionTitle title={'Theme Setting:'} />*/}
                            <DarkThemeSwitch/>
                            <Typography variant='title' style={{marginBottom: '0.3cm'}}>Log Coloring:</Typography>
                            {/*<SessionTitle title={'Log Coloring:'} />*/}
                            <ControlPanel className={classes.Control} />
                            <Paper className={classes.paper} style={{marginTop: '0.5cm'}}>
                                <FilterField/>
                            </Paper>
                        </Paper>
                    </NoSsr>
                </Modal>
            </div>
        )
    }
}

export default withStyles(styles) (SettingsButton)
