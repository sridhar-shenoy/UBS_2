import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import {lighten} from '@material-ui/core/styles/colorManipulator';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import SimpleModal from './TableModal'
import TextField from "@material-ui/core/TextField/TextField";
import {compose} from 'redux'
import {connect} from 'react-redux'
import ClickActionOfTableInModal from "./ClickActionOfTableInModal";
import {traceOrder} from "../query_script/TraceOrder";
import {countEntries} from "../query_script/SearchES"

const actionsStyles = theme => ({
    root: {
        flexShrink: 0,
        color: theme.palette.text.secondary,
        marginLeft: theme.spacing.unit * 2.5,
    },
});

function createData(queryArray) {
    var dict = {};
    dict['id'] = queryArray['_id'];
    var _source = Object.keys(queryArray['_source']);
    for(var i = 0; i < _source.length; i++){
        if(_source[i] === 'EVENT_event_msg'){
            var _event = Object.keys(queryArray['_source']['EVENT_event_msg']);
            // console.log(_event);
            for(var j = 0; j < _event.length; j++){
                dict['EVENT_event_msg.'+_event[j]] = queryArray['_source']['EVENT_event_msg'][_event[j]]
            }
        } else {
            dict[_source[i]] = queryArray['_source'][_source[i]]
        }
    }
    // console.log(dict)
    return dict;
}

/**
 * This is the pagination for the result table
 */
class TablePaginationActions extends React.Component {
    handleFirstPageButtonClick = event => {
        this.props.onChangePage(event, 0);
    };

    handleBackButtonClick = event => {
        this.props.onChangePage(event, this.props.page - 1);
    };

    handleNextButtonClick = event => {
        this.props.onChangePage(event, this.props.page + 1);
    };

    handleLastPageButtonClick = event => {
        this.props.onChangePage(
            event,
            Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1),
        );
    };

    render() {
        const { classes, count, page, rowsPerPage, theme } = this.props;

        return (
            <div className={classes.root}>
                <IconButton
                    onClick={this.handleFirstPageButtonClick}
                    disabled={page === 0}
                    aria-label="First Page"
                >
                    {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
                </IconButton>
                <IconButton
                    onClick={this.handleBackButtonClick}
                    disabled={page === 0}
                    aria-label="Previous Page"
                >
                    {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                </IconButton>
                <IconButton
                    onClick={this.handleNextButtonClick}
                    disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                    aria-label="Next Page"
                >
                    {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                </IconButton>
                <IconButton
                    onClick={this.handleLastPageButtonClick}
                    disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                    aria-label="Last Page"
                >   
                    {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
                </IconButton>
            </div>
        );
    }
}

/*
TablePaginationActions.propTypes = {
    classes: PropTypes.object.isRequired,
    count: PropTypes.number.isRequired,
    onChangePage: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
    theme: PropTypes.object.isRequired,
};
*/

const TablePaginationActionsWrapped = withStyles(actionsStyles, { withTheme: true })(
    TablePaginationActions,
);

function desc(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function stableSort(array, cmp) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = cmp(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
    return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

class ResultTableHead extends React.Component {

    constructor(props){
        super(props);
    }

    createSortHandler = property => event => {
        this.props.onRequestSort(event, property);
    };

    render() {
        // put the column object into the array 'rows'
        var rows = [];
        for (var i = 0; i < this.props.columnFilter.length ; i++) {
            // append all the filters chosen into the array
            rows.push({ id: this.props.columnFilter[i] , numeric: false, disablePadding: true, label: this.props.columnFilter[i] })
        }
        // append the message column at last, letting other filters place before the long message
        rows.push({id: 'message', numeric: false, disablePadding: true, label: 'message'});
        const { order, orderBy, numSelected, rowCount, entryCount } = this.props;

        return (
            <TableHead>
                <TableRow>
                    {rows.map(row => {
                        return (
                            <TableCell
                                key={row.id}
                                numeric={row.numeric}
                                // padding={row.disablePadding ? 'none' : 'default'}
                                sortDirection={orderBy === row.id ? order : false}
                            >
                                <Tooltip
                                    title="Sort"
                                    placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                                    enterDelay={300}
                                >
                                    <TableSortLabel
                                        active={orderBy === row.id}
                                        direction={order}
                                        onClick={this.createSortHandler(row.id)}
                                    >
                                        {row.label}
                                    </TableSortLabel>
                                </Tooltip>
                            </TableCell>
                        );
                    }, this)}
                </TableRow>
            </TableHead>
        );
    }
}

ResultTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    // onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

const toolbarStyles = theme => ({
    root: {
        paddingRight: theme.spacing.unit,
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    spacer: {
        flex: '1 1 100%',
    },
    actions: {
        color: theme.palette.text.secondary,
        width: '20em',
    },
    title: {
        flex: '0 0 auto',
    },
});


let ResultTableToolbar = props => {
    const { numSelected, classes, numEntries } = props;

    return (
        <Toolbar
            className={classNames(classes.root, {
                [classes.highlight]: numSelected > 0,
            })}
        >
            <div className={classes.title}>
                {numSelected > 0 ? (
                    <Typography color="inherit" variant="subtitle1">
                        {numSelected} selected
                    </Typography>
                    )
                    :
                    (
                    <Typography variant="h6" id="tableTitle">
                        Result Table
                    </Typography>
                    )
                }
            </div>
            <div className={classes.spacer} />
            <div>
                <Typography variant="h6" id="numEntries">
                    Database entries: {numEntries}
                </Typography>
            </div>
            <div className={classes.spacer} />
            <div className={classes.actions}>
                <TextField
                    label='Find in table'
                    placeholder='Keywords'
                    fullWidth={true}
                    onKeyPress={
                        (e) => {
                            if (e.key === 'Enter') {
                                window.find(e.target.value)
                            }
                        }
                    }
                    // style={{width: '15em'}}
                />
                {/*{numSelected > 0 ? (
                    <Tooltip title="Delete">
                        <IconButton aria-label="Delete">
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                ) : (
                    <Tooltip title="Filter list">
                        <IconButton aria-label="Filter list">
                            <FilterListIcon />
                        </IconButton>
                    </Tooltip>
                )}*/}
            </div>
        </Toolbar>
    );
};

ResultTableToolbar.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
    numEntries: PropTypes.number.isRequired
};

ResultTableToolbar = withStyles(toolbarStyles)(ResultTableToolbar);

const styles = theme => ({
    root: {
        width: '100%',
        // marginTop: theme.spacing.unit * 3,
    },
    table: {
        minWidth: 1020,
    },
    tableWrapper: {
        overflowX: 'auto',
    },
});
class ResultTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            order: 'asc',
            orderBy: 'calories',
            selected: [],
            selectedItem: '',
            page: 0,
            rowsPerPage: 10,
            open: false,
            searchItem: null,
            menuOpen: false,
            anchorEl: null,
            selectLogId: null,
            selectLogType: null,
            numEntries: 15
        }
        this.setEntries()
    }

    async setEntries(){
        var count = await countEntries()
        this.setState({numEntries: count})
    }

    handleModalClose(){
        this.setState({open: false})
    }

    handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = 'desc';

        if (this.state.orderBy === property && this.state.order === 'desc') {
            order = 'asc';
        }
        this.setState({ order, orderBy });
    };

    // serve as a potential feature, uncomment if you want to add
    /*handleSelectAllClick = event => {
        if (event.target.checked) {
            this.setState(state => ({ selected: state.data.map(n => n.id) }));
            return;
        }
        this.setState({ selected: [] });
    };*/

    handleMouseClickOnResultTable = (event, id, selectedItem) => {
        if (event.type === 'click') {
            this.setState({selectedItem});
            this.setState({open: true});
        } else if (event.type === 'contextmenu') {
            this.setState({menuOpen: true});
            this.setState({anchorEl: event.currentTarget});
            this.setState({selectLogType: selectedItem.type});
            this.setState({selectLogId: selectedItem[selectedItem.type + '_id']});
            event.preventDefault()
        }

    };

    handleMenuClose(){
        this.setState({menuOpen: false})
    }

    handleMenuClickClose(){
        this.setState({menuOpen: false});
        this.props.traceOrder(this.state.selectLogType, this.state.selectLogId)

    }

    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };

    isSelected = id => this.state.selected.indexOf(id) !== -1;

    render() {
        const data = this.props.resultLog.map((x) => {
            return createData(x)
        });
        const { classes } = this.props;
        const { order, orderBy, selected, rowsPerPage, page, searchItem, numEntries } = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

        return (
            <Paper className={classes.root}>
                <SimpleModal
                    open={this.state.open}
                    handleModalClose={this.handleModalClose.bind(this)}
                    object = {this.state.selectedItem}
                />
                <ResultTableToolbar
                    numSelected={selected.length}
                    classes={classes}
                    numEntries={numEntries}
                />
                <div className={classes.tableWrapper}>
                    <Table className={classes.table} aria-labelledby="tableTitle">
                        <ResultTableHead
                            columnFilter = {this.props.columnFilter}
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={this.handleRequestSort}
                            rowCount={data.length}
                        />
                        <TableBody>
                            {stableSort(data, getSorting(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map(n => {
                                    return (
                                        <TableRow
                                            hover
                                            onClick={event => this.handleMouseClickOnResultTable(event, n.id, n)}
                                            onContextMenu={event => this.handleMouseClickOnResultTable(event, n.id, n)}
                                            role="checkbox"
                                            tabIndex={-1}
                                            key={n.id}
                                            style={
                                                {
                                                    color: (n['type'] !== 'proxy' ? (n['type'] === 'event' ? this.props.eventColor : this.props.gatewayColor) : this.props.proxyColor),
                                                }
                                            }
                                        >
                                            {
                                                this.props.columnFilter.map( (x) =>
                                                    <TableCell style={{color: 'inherit'}}>{n[x] !== undefined ? n[x] : ''}</TableCell>
                                                )
                                            }
                                            <TableCell component="th" scope="row" style={{color: 'inherit'}}>
                                                {n['message']}
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: 49 * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                            <ClickActionOfTableInModal
                                open={this.state.menuOpen}
                                handleMenuClose={this.handleMenuClose.bind(this)}
                                handleMenuClickClose={this.handleMenuClickClose.bind(this)}
                                anchorEl = {this.state.anchorEl}
                                textDisplay = 'Trace Order'
                            />
                        </TableBody>
                    </Table>
                </div>
                <TablePagination
                    component="div"
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    backIconButtonProps={{
                        'aria-label': 'Previous Page',
                    }}
                    rowsPerPageOptions={[10,20,30]}
                    nextIconButtonProps={{
                        'aria-label': 'Next Page',
                    }}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                    Actionscomponent={TablePaginationActionsWrapped}
                />
            </Paper>
        );
    }
}

ResultTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        proxyColor: (state.darkTheme ? state.logColor.darkProxy : state.logColor.lightProxy),
        eventColor: (state.darkTheme ? state.logColor.darkEvent : state.logColor.lightEvent),
        gatewayColor: (state.darkTheme ? state.logColor.darkGateway : state.logColor.lightGateway),
        columnFilter: state.columnFilter,
        resultLog: state.resultLog,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        /**
         * trace order given log type and log id
         * @param selectLogType - log type (proxy, event, gateway)
         * @param selectLogId - log id
         */
        traceOrder: async (selectLogType, selectLogId) => {
            const action = {
                type: 'TRACE_ORDER',
                payload: {resultLog: await traceOrder(selectLogType, selectLogId)}
            };
            dispatch(action)
        }
    }
}

const ExportEnhance = compose(
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps),
);

export default ExportEnhance(ResultTable);
