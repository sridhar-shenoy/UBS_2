import React from 'react'
// import SearchField from "./SearchField"
import PropTypes from 'prop-types'
import {createMuiTheme, MuiThemeProvider, withStyles} from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
// import OrderAnalysis from './OrderAnalysis'
import DashBoardBar from './DashBoardBar'
import CssBaseline from '@material-ui/core/CssBaseline'
import {compose} from 'redux'
import {connect} from 'react-redux'
import Typography from '@material-ui/core/Typography'
import DarkThemeSwitch from './utils/DarkThemeSwitch.js'
import ControlPanel from './utils/ControlPanel.js'

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
});

/**
 * This is the the admin page view of the dashboard
 */
export class AdminPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            snack_message: '',
            input: ''
        };
        this.callSnackBar = this.callSnackBar.bind(this);
    }


    // Override the 'collide_type' array in 'this.state' with the types(proxy, event, gateway) being put in the 'collideType'
    updateCollideId(collideType) {
        this.setState({collide_type: collideType})
    }

    callSnackBar(message){
        this.setState({snack_message: message})
    }

    updateDarkLightTheme(){
        console.log('yeah!');
        // console.log(this.state.darkTheme + !this.state.darkTheme)
        this.setState({darkTheme: !this.state.darkTheme})
    }

    getPickerColor(logType, colorHex){
        console.log(logType, colorHex);
        const logColor = this.state.logColor;
        if(logType === 'proxy'){
            logColor['proxy'] = colorHex
        } else if(logType === 'event'){
            logColor['event'] = colorHex
        } else if(logType === 'gateway'){
            logColor['gateway'] = colorHex
        }
        this.setState({logColor});
        console.log(logColor)
    }

    getSearchID = () => {
      return this.state.input
    };

    render() {
        const { classes } = this.props;
        // console.log(this.props)
        return (
            // Change theme(dark, light, style) upon changing 'theme'
            <MuiThemeProvider
                theme={createMuiTheme({
                    palette: {
                        primary: this.props.palette['primary'],
                        secondary: this.props.palette.secondary,
                        type: (this.props.darkTheme ? 'dark' : 'light'),
                    },
                })}
            >
                <CssBaseline/>
                <div id = "dashboard_container">
                    <div className={classes.root}>
                        <Grid container spacing={24}>
                            {/* console.log('redux store call: ' + this.props.count)}
                            {/* The appbar now is containing the search bar, setting*/}
                            <Grid item xs={12}>
                                <DashBoardBar/>
                            </Grid>
                        </Grid>
                        {/*
                          <AdminControlTable />
                          // this is for the following paper style style={{marginTop: '0.5cm'}}
                        */}
                        <Paper className={classes.paper} >
                            <Typography variant='title'>Default Theme Setting:</Typography>
                            <DarkThemeSwitch/>
                            <Typography variant='title' style={{marginBottom: '0.3cm'}}>Default Log Coloring:</Typography>
                            <ControlPanel className={classes.Control} />
                        </Paper>
                    </div>
                </div>
            </MuiThemeProvider>
        )
    }
}

AdminPage.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    // console.log('mapStateToProps, AdminPage', state)
    return {
        palette: state.palette,
        darkTheme: state.darkTheme,
    }
}

const ExportEnhance = compose(
    withStyles(styles),
    connect(mapStateToProps),
);

export default ExportEnhance(AdminPage)
