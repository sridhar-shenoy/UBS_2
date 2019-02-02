import React from 'react'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import {connect} from 'react-redux'

/**
 * This indicates whether to enable dark theme
 */
class DarkThemeSwitch extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <FormGroup row>
                <FormControlLabel
                    control={
                        <Switch
                            checked={this.props.darkTheme}
                            onChange={this.props.toggleDarkTheme}
                        />
                    }
                    label={this.props.darkTheme ? 'Dark Mode': 'Light Mode'}
                />
            </FormGroup>
        )
    }
}

function mapStateToProps(state) {
    return {
        darkTheme: state.darkTheme,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        toggleDarkTheme: () => {
            const action = {
                type: 'TOGGLE_DARKTHEME'
            };
            dispatch(action)
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DarkThemeSwitch)

