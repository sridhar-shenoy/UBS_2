import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {MuiThemeProvider, withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import NoSsr from '@material-ui/core/NoSsr';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import MenuItem from '@material-ui/core/MenuItem';
import CancelIcon from '@material-ui/icons/Cancel';
import Select from 'react-select'
import {emphasize} from '@material-ui/core/styles/colorManipulator';
import {connect} from 'react-redux'
import {compose} from 'redux'


const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    input: {
        display: 'flex',
        padding: 0,
    },
    valueContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        flex: 1,
        alignItems: 'center',
    },
    chip: {
        margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`,
    },
    chipFocused: {
        backgroundColor: emphasize(
            theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[700],
            0.08,
        ),
    },
    noOptionsMessage: {
        padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
    },
    singleValue: {
        fontSize: 16,
    },
    placeholder: {
        position: 'absolute',
        left: 2,
        fontSize: 16,
    },
    paper: {
        position: 'absolute',
        zIndex: 1,
        marginTop: theme.spacing.unit,
        left: 0,
        right: 0,
    },
    divider: {
        height: theme.spacing.unit * 2,
    },
});

function NoOptionsMessage(props) {
    return (
        <Typography
            color="textSecondary"
            className={props.selectProps.classes.noOptionsMessage}
            {...props.innerProps}
        >
            {props.children}
        </Typography>
    );
}

function inputComponent({ inputRef, ...props }) {
    return <div ref={inputRef} {...props} />;
}

function Control(props) {
    return (
        <TextField
            fullWidth
            InputProps={{
                inputComponent,
                inputProps: {
                    className: props.selectProps.classes.input,
                    inputRef: props.innerRef,
                    children: props.children,
                    ...props.innerProps,
                },
            }}
            {...props.selectProps.textFieldProps}
        />
    );
}

function Option(props) {
    return (
        <MenuItem
            buttonRef={props.innerRef}
            selected={props.isFocused}
            component="div"
            style={{
                fontWeight: props.isSelected ? 500 : 400,
            }}
            {...props.innerProps}
        >
            {props.children}
        </MenuItem>
    );
}

function Placeholder(props) {
    return (
        <Typography
            color="textSecondary"
            className={props.selectProps.classes.placeholder}
            {...props.innerProps}
        >
            {props.children}
        </Typography>
    );
}

function SingleValue(props) {
    return (
        <Typography className={props.selectProps.classes.singleValue} {...props.innerProps}>
            {props.children}
        </Typography>
    );
}

function ValueContainer(props) {
    return <div className={props.selectProps.classes.valueContainer}>{props.children}</div>;
}

function MultiValue(props) {
    return (
        <Chip
            tabIndex={-1}
            label={props.children}
            className={classNames(props.selectProps.classes.chip, {
                [props.selectProps.classes.chipFocused]: props.isFocused,
            })}
            onDelete={props.removeProps.onClick}
            deleteIcon={<CancelIcon {...props.removeProps} />}
        />
    );
}

function Menu(props) {
    return (
        <Paper square className={props.selectProps.classes.paper} {...props.innerProps}>
            {props.children}
        </Paper>
    );
}

const components = {
    Control,
    Menu,
    MultiValue,
    NoOptionsMessage,
    Option,
    Placeholder,
    SingleValue,
    ValueContainer,
};

/**
 * This is the filter field in the setting button modal for filtering the logs in result table
 */
class FilterField extends React.Component {
    handleFilterFieldChange = name => value => {
        this.props.updateColumnFilterObject(value)
    };

    constructor(props){
        super(props);
        this.state = {
            single: null,
            multi: null,
        };
        this.handleFilterFieldChange = this.handleFilterFieldChange.bind(this)
    }

    render() {
        const { classes, theme } = this.props;
        const selectStyles = {
            input: base => ({
                ...base,
                color: this.props.palette.primary,
                '& input': {
                    font: 'inherit',
                },
            }),
        };

        return (
            <MuiThemeProvider theme={theme}>

            <div className={classes.root}>
                <NoSsr>
                <Select
                    classes={classes}
                    styles={selectStyles}
                    textFieldProps={{
                        label: 'Filter field',
                        InputLabelProps: {
                            shrink: true,
                        },
                    }}
                    options={this.props.columnFilterOption}
                    components={components}
                    value={this.props.columnFilterObject}
                    onChange={this.handleFilterFieldChange('multi')}
                    placeholder="Select multiple fix tags"
                    isMulti
                    cacheOptions
                />
                </NoSsr>
            </div>
            </MuiThemeProvider>
        );
    }
}

FilterField.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

function mapStateToProps(state){
    return {
        palette: state.palette,
        columnFilterOption: state.columnFilterOption,
        columnFilterObject: state.columnFilterObject,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        updateColumnFilterObject: (columnFilterObject) => {
            console.log(columnFilterObject);
            const action = {
                type: 'UPDATE_COLUMNFILTEROBJECT',
                payload: {columnFilterObject: columnFilterObject}
            };
            dispatch(action)
        }
    }
}

const ExportEnhance = compose(
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps)
);

export default ExportEnhance(FilterField);
