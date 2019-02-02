import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography'
import {connect} from 'react-redux'
import {compose} from 'redux'
import {withStyles} from '@material-ui/core/styles';
import ClickActionOfTableInModal from './ClickActionOfTableInModal';
const styles = theme => ({
    root: {
        position: 'absolute',
        marginTop: theme.spacing.unit * 3,
    },
    table: {
        minWidth: 700,
        maxHeight: '90%',
        width: '100%',
        tableLayout: 'fixed',
    },
    row: {
        height:'8px',
        width: '10%',
    },
    cellID:{
        width: '20%',
    },
    cellCO:{
        width: '80%',
        overflow: 'hidden',
        wordWrap: 'break-word',
    },
});

/**
 * This is component for the table in the pop up after clicking in log showing the content of the app
 */
class TableInModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            menuOpen: false,
            row_fix_id: null,
            row_fix_content : null,
            anchorEl: null,
        }
    }

    handleMenuClose(){
        this.setState({menuOpen: false})
    }

    handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = 'desc';
        if (this.state.orderBy === property && this.state.order === 'desc') {
            order = 'asc';
        }
        this.setState({ order, orderBy });
    };

    handleTableInModalRowClick = (event, fix_id, fix_content) => {
        if (event.type === 'contextmenu') {
            this.setState({menuOpen: true});    
            this.setState({row_fix_id: fix_id});
            this.setState({row_fix_content: fix_content});
            this.setState({anchorEl: event.currentTarget});
            event.preventDefault()
        }
    };

    handleMenuClickClose(){
        this.setState({menuOpen: false});
        this.props.appendColumnFilter(this.state.row_fix_id)

    }

    render() {
        const { classes } = this.props;
        let arr_key = Object.keys(this.props.content);
        let arr_val = Object.values(this.props.content);
        var result = [];
        arr_key.forEach((key, i) => result.push({
                id:i,
                key:key,
                value:arr_val[i],
            }
        ));
        return (
            <Paper className={classes.root}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.cellID} ><Typography variant='h6'>Field</Typography></TableCell>
                            <TableCell className={classes.cellCO}><Typography variant='h6'>Value</Typography></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {result.map(row => {
                            return (
                                <TableRow
                                    className={classes.row}
                                    key={row.id}
                                    hover
                                    onContextMenu={event => this.handleTableInModalRowClick(event, row.key, row.value)}
                                >
                                    <TableCell className={classes.cellID} component="th" scope="row">
                                        {row.key}
                                    </TableCell>
                                     <TableCell className={classes.cellCO} >
                                    {row.value.toString()}
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                        <ClickActionOfTableInModal
                            open={this.state.menuOpen}
                            handleMenuClose={this.handleMenuClose.bind(this)}
                            handleMenuClickClose={this.handleMenuClickClose.bind(this)}
                            logType={this.state.logType}
                            anchorEl = {this.state.anchorEl}
                            textDisplay = 'Add this column into Result Table'
                        />
                    </TableBody>
                </Table>
            </Paper>

        )
    }

}

function mapDispatchToProps(dispatch) {
    return {
        appendColumnFilter: (columnFilter) => {
            const action = {
                type: 'ADD_COLUMNFILTER',
                payload: {columnFilter: columnFilter}
            };
            dispatch(action)
        }
    }
}

const ExportEnhance = compose(
    withStyles(styles),
    connect(function(state){}, mapDispatchToProps)
);

export default ExportEnhance(TableInModal);
