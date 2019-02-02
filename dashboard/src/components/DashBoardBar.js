import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import {fade} from '@material-ui/core/styles/colorManipulator';
import {withStyles} from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import SettingsIcon from '@material-ui/icons/Settings';
import MoreIcon from '@material-ui/icons/MoreVert';
import {getRespondWithQueryString} from "../query_script/SearchES";
import FormControl from "@material-ui/core/FormControl/FormControl";
import SettingsButton from './SettingsButton.js'
import {compose} from 'redux'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import Downshift from 'downshift'

var suggestions = [];

const styles = theme => ({
    root: {
        width: '100%',
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing.unit * 2,
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing.unit * 3,
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing.unit * 9,
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    settingsIcon: {
        margin: theme.spacing.unit,
    },
    inputRoot: {
        color: 'inherit',
        width: '100%',
    },
    inputInput: {
        paddingTop: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
        paddingLeft: theme.spacing.unit * 10,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: 200,
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
});

class DashBoardBar extends React.Component {
    handleSettingsVisible = () => {
        this.child.handleOpen()
    };
    goToAdminPage = () => {
        this.props.history.push('/admin')
    };

    goToAdminPage = () => {
        this.directToAdmin()
    };

    handleProfileMenuOpen = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleMenuClose = () => {
        this.setState({ anchorEl: null });
        this.handleMobileMenuClose();
    };

    handleMobileMenuOpen = event => {
        this.setState({ mobileMoreAnchorEl: event.currentTarget });
    };

    handleMobileMenuClose = () => {
        this.setState({ mobileMoreAnchorEl: null });
    };

    handleSearchBoxTextChange(e) {
        this.setState({searchText: e.target.value})
    }

    goToDashBoard = () => {
        this.props.history.push('/dashboard')
    };

    directToAdmin() {
        this.props.history.push('/admin')
    }

    test(){
        alert(3)
    }

    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null,
            mobileMoreAnchorEl: null,
            searchText: '',
            site: 'dashboard',
        };
        this.handleSearchBoxTextChange = this.handleSearchBoxTextChange.bind(this);
        this.handleSearchBoxTextSubmit = this.handleSearchBoxTextSubmit.bind(this);
        this.handleSettingsVisible = this.handleSettingsVisible.bind(this);
        this.goToAdminPage = this.goToAdminPage.bind(this);
        this.goToDashBoard = this.goToDashBoard.bind(this)
    }

    async handleSearchBoxTextSubmit(text) {
        suggestions = [{name: text.name}].concat(suggestions)
        if(suggestions.length > 5){
            suggestions = suggestions.slice(0,5)
        }
        let respond = await getRespondWithQueryString(text.name);
        if (respond.length !== 0)
            this.props.updateQueryResult(respond);
        else {
            this.props.popSnackBar('Result not found, please try again!')
        }
    }

    render() {
        const { anchorEl, mobileMoreAnchorEl } = this.state;
        const { classes } = this.props;
        const isMenuOpen = Boolean(anchorEl);
        const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

        const renderMenu = (
            <Menu
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={isMenuOpen}
                onClose={this.handleMenuClose}
            >
                <MenuItem onClick={this.handleMenuClose}>My account</MenuItem>
                {this.props.history.location.pathname === '/dashboard' ? <MenuItem onClick={this.goToAdminPage}>Go to Admin Page</MenuItem> : <MenuItem onClick={this.goToDashBoard}>Go to Dashboard</MenuItem>}
            </Menu>
        );

        const renderMobileMenu = (handleSettingsVisible) => (
            <Menu
                anchorEl={mobileMoreAnchorEl}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={isMobileMenuOpen}
                onClose={this.handleMobileMenuClose}
            >
                <MenuItem onClick={handleSettingsVisible}>
                    <SettingsIcon className={classes.settingsIcon}/>
                    <p>Settings</p>
                </MenuItem>
                <MenuItem>
                    <AccountCircle className={classes.settingsIcon}/>
                    <p>Profile</p>
                </MenuItem>
            </Menu>
        );

        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        {/*<IconButton className={classes.menuButton} color="inherit" aria-label="Open drawer">
                            <MenuIcon />
                        </IconButton>*/}
                        <Typography className={classes.title} variant="h6" color="inherit" noWrap>
                            UBS Trading Diagnosis
                        </Typography>
                        <div className={classes.search}>
                        <table>
                                        <tr>
                                            <th>
                                                <Downshift
                                  onChange={selection => this.handleSearchBoxTextSubmit(selection)}
                                  itemToString={item => (item ? item.name : "")}
                                >
                                  {({
                                    getInputProps,
                                    getItemProps,
                                    isOpen,
                                    inputValue,
                                    highlightedIndex,
                                    selectedItem,
                                    highlightedItem,
                                    getLabelProps
                                  }) => (
                                    <div>
                                      <input {...getInputProps({ placeholder: "Search" })} />
                                      {isOpen ? (
                                        <div className="downshift-dropdown">
                                          {[{name : inputValue}].concat(suggestions
                                            .filter(
                                              item =>
                                                !inputValue ||
                                                item.name.toLowerCase().includes(inputValue.toLowerCase())
                                            ))
                                            .map((item, index) => (
                                              <div
                                                className="dropdown-item"
                                                {...getItemProps({ key: item.name, index, item })}
                                                style={{
                                                  backgroundColor:
                                                    highlightedIndex === index ? "lightgray" : "white",
                                                  fontWeight: selectedItem === item ? "bold" : "normal",
                                                  color: "black"
                                                }}
                                              >
                                                {item.name}
                                              </div>
                                            ))}
                                        </div>
                                      ) : null}
                                    </div>
                                  )}
                                </Downshift>
                                            </th>
                                            <th>
                                                              <div className={classes.searchIcon}>
                                <SearchIcon/>
                            </div>
                                            </th>
                                            
                                        </tr>
                                    </table>
                        </div>
                        <div className={classes.grow} />
                        <div className={classes.sectionDesktop}>

                            <SettingsButton onRef={ref => (this.child = ref)}/>

                            <IconButton
                                aria-owns={isMenuOpen ? 'material-appbar' : null}
                                aria-haspopup="true"
                                onClick={this.handleProfileMenuOpen}
                                color="inherit"
                            >
                              <AccountCircle />
                            </IconButton>
                        </div>
                        <div className={classes.sectionMobile}>
                            <IconButton aria-haspopup="true" onClick={this.handleMobileMenuOpen} color="inherit">
                                <MoreIcon />
                            </IconButton>
                        </div>
                    </Toolbar>
                </AppBar>
                {renderMenu}
                {renderMobileMenu(this.handleSettingsVisible)}
            </div>
        );
    }
}

DashBoardBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        isAdmin: state.isAdmin,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        popSnackBar: (snackMessage) => {
            console.log('popSnackBar');
            const action = {
                type: 'POPUP_SNACKBAR',
                payload: {snackMessage: snackMessage},
            };
            dispatch(action)
        },
        updateQueryResult: (respond) => {
            const action = {
                type: 'UPDATE_SEARCH',
                payload: {resultLog: respond}
            };
            dispatch(action)
        }
    }
}

const ExportEnhance = compose(
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps),
);

export default withRouter(ExportEnhance(DashBoardBar))
