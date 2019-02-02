import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import TableInModal from './TableInModal'
import SearchBarInModal from './SearchBarInModal'

function getModalStyle() {
    const top = 50 ;
    const left = 50 ;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const styles = theme => ({
    paper: {
        position: 'fixed',
        // width: theme.spacing.unit * 50,
        width: '90%',
        height: '85%',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 1,
        overflowY: 'scroll',
        overflowX: 'hidden',
    },
});

/**
 * This is the modal when click on individual log
 */
class SimpleModal extends React.Component {
    handleTableModalClose = () => {
        this.props.handleModalClose()
    };

    constructor(props){
        super(props);
        this.handleTableModalClose = this.handleTableModalClose.bind(this)
    }

    render() {
        const { classes } = this.props;
        // console.log(this.props.object);
        return (
            <div>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.props.open}
                    onClose={this.handleTableModalClose}
                >
                    <div style={getModalStyle()} className={classes.paper}>
                        <Typography variant="h6" id="modal-title">
                            {/* Text in a modal */}
                            {/* {this.props.object ? 'ID: ' + this.props.object.id: ''} */}

                            <SearchBarInModal Idofthe={this.props.object ? 'ID: ' + this.props.object.id: ' '} />

                        </Typography>
                        {/*<Typography variant="subtitle1" id="simple-modal-description">*/}
                            {/* {this.props.object? this.props.object.id: ""} */}

                            <TableInModal content = {this.props.object} />
                            {/* add table here */}
                        {/*<SimpleModalWrapped />*/}
                        {withStyles(styles)(SimpleModal)}
                    </div>
                </Modal>
            </div>
        );
    }
}

SimpleModal.propTypes = {
    classes: PropTypes.object.isRequired,
    object: PropTypes.object,
};

// We need an intermediary variable for handling the recursive nesting.
const SimpleModalWrapped = withStyles(styles)(SimpleModal);

export default SimpleModalWrapped;
