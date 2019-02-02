import React from 'react'
import {SwatchesPicker} from 'react-color'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Typography from '@material-ui/core/Typography'
import NoSsr from '@material-ui/core/NoSsr'
import {connect} from 'react-redux'
import propTypes from 'prop-types'

/**
 * This is the colorpicker component in the setting panel
 */
class ColorPickerItem extends React.Component {
    constructor(props) {
        super(props);
    }

    handleChangeComplete = (color) => {
        // To update the state of the title
        this.props.onChangePickerColor(color, this.props.type)
    };

    render() {
        return (
            <div>
                <NoSsr>
                    <ExpansionPanel expanded={this.props.expanded} onChange={this.props.expandControl}>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            {/*Subheading of the color chooser*/}
                            <Typography variant='subheading' style={{color: getColor(this.props, this.props.type)}}>{this.props.title}</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails style={{textAlign: 'center'}}>
                            {/*Color picker of the specified log type*/}
                            <SwatchesPicker color={getColor(this.props, this.props.type)} onChange={this.handleChangeComplete.bind(this)} style={{width: '100%'}} />
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                </NoSsr>
            </div>
        )
    }
}

ColorPickerItem.propTypes = {
    title: propTypes.string,
    type: propTypes.string,
};

/**
 * Return color with respect to the log
 * @param OwnProps - this.props object
 * @param logType - type of log (proxy, event, gateway)
 * @returns string - hex color string
 */
function getColor(OwnProps, logType){
    switch (logType) {
        case 'proxy':
            return OwnProps.proxyColor;
        case 'event':
            return OwnProps.eventColor;
        case 'gateway': return OwnProps.gatewayColor
    }
}

function mapStateToProps(state) {
    return {
        proxyColor: (state.darkTheme ? state.logColor.darkProxy : state.logColor.lightProxy),
        eventColor: (state.darkTheme ? state.logColor.darkEvent : state.logColor.lightEvent),
        gatewayColor: (state.darkTheme ? state.logColor.darkGateway : state.logColor.lightGateway),
    }
}

function mapDispatchToProps(dispatch) {
    return {
        /**
         * change color of the log of the specified type
         * @param color - hex color string
         * @param logType - type of log (proxy, event, gateway)
         */
        onChangePickerColor: (color, logType) => {
            const action = {
                type: 'CHANGE_LOGCOLOR',
                payload: {logType: logType, colorHex: color.hex}
            };
            dispatch(action)
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ColorPickerItem)
