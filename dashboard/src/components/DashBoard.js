import React from 'react'
import ResultTable from "./ResultTable"
import PropTypes from 'prop-types'
import {createMuiTheme, MuiThemeProvider, withStyles} from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import DashBoardBar from './DashBoardBar'
import SimpleSnackbar from './SnackBar'
import CssBaseline from '@material-ui/core/CssBaseline'
import NoSsr from '@material-ui/core/NoSsr'
import {compose} from 'redux'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {countEntries} from '../query_script/SearchES'

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
 * This is the main dashboard view for the application
 */
export class DashBoard extends React.Component {
    constructor(props){
        super(props);
        
        this.state = {
            snack_message: '',
            input: '',
        };
        this.callSnackBar = this.callSnackBar.bind(this);
    }

    callSnackBar(message){
        this.setState({snack_message: message})
    }

    render() {
        const { classes } = this.props;
        return (
            // Change theme(dark, light, style) upon changing 'theme'
            <NoSsr>
                <MuiThemeProvider
                    theme={createMuiTheme({
                        palette: {
                            primary: this.props.palette['primary'],
                            secondary: this.props.palette['secondary'],
                            type: (this.props.darkTheme ? 'dark' : 'light'),
                        },
                    })}
                >
                    <CssBaseline/>
                    <div id="dashboard_container">
                        <div className={classes.root}>
                            <Grid container spacing={24}>
                                {/*console.log('redux store call: ' + this.props.count)*/}
                                {/* The appbar now is containing the search bar, setting*/}
                                <Grid item xs={12}>
                                    <DashBoardBar/>
                                </Grid>
                                {/* Upon selection, a notification bar will pop up to notify the change has been made and updated*/}
                                <SimpleSnackbar message={this.props.snackMessage} open={this.props.snackMessagePopUp}/>
                                {/* Main Result Table used to show the logs crawled from ES*/}
                                <Grid item xs={12}>
                                    <div>Search results: </div>
                                    <ResultTable/>
                                </Grid>
                            </Grid>
                        </div>
                    </div>
                </MuiThemeProvider>
            </NoSsr>
        )
    }
}

DashBoard.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        palette: state.palette,
        darkTheme: state.darkTheme,
        snackMessage: state.snackMessage,
    }
}

const ExportEnhance = compose(
    withStyles(styles),
    connect(mapStateToProps),
);

export default withRouter(ExportEnhance(DashBoard))
