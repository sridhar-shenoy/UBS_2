import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import {compose} from "redux";
import connect from "react-redux/es/connect/connect";
import {withRouter} from "react-router-dom";

const styles = theme => ({
    close: {
        padding: theme.spacing.unit / 2,
    },
});

/**
 * This is handle the snack bar pop up notification
 */
class SimpleSnackbar extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={this.props.snackMessagePopUp}
                    autoHideDuration={2000}
                    onClose={this.props.handleSnackBarClose}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">{this.props.snackMessage}</span>}
                    action={[
                        <IconButton
                            key="close"
                            aria-label="Close"
                            color="inherit"
                            className={classes.close}
                            onClick={this.props.handleSnackBarClose}
                        >
                            <CloseIcon />
                        </IconButton>,
                    ]}
                />
            </div>
        );
    }
}

SimpleSnackbar.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        snackMessage: state.snackMessage,
        snackMessagePopUp: state.snackMessagePopUp,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        handleSnackBarClose: (event, reason) => {
            // console.log('handleSnackBarClose')
            if (reason === 'clickaway') {
                return;
            }
            const action = {
                type: 'CLOSE_SNACKBAR',
                payload: {snackMessagePopUp: false}
            };
            dispatch(action)
        }
    }
}

const ExportEnhance = compose(
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps),
);

export default withRouter(ExportEnhance(SimpleSnackbar))
