import React from 'react'
import NoSsr from '@material-ui/core/NoSsr'
import ColorPickerItem from './ColorPickerItem.js'

/**
 * This is a control panel which contains proxy, event, gateway log color picker
 */
export class ControlPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: '',
        }
    }

    expandControl = panel => (event, expanded) => {
        this.setState({
            expanded: expanded ? panel : false,
        });
    };

    render() {
        return (
            <div>
                <NoSsr>
                    <ColorPickerItem title='Proxy Logs' type='proxy' expandControl={this.expandControl('PL').bind(this)}
                                     expanded={this.state.expanded === 'PL'}/>
                    <ColorPickerItem title='Event Logs' type='event' expandControl={this.expandControl('EL').bind(this)}
                                     expanded={this.state.expanded === 'EL'}/>
                    <ColorPickerItem title='Gateway Logs' type='gateway'
                                     expandControl={this.expandControl('GL').bind(this)}
                                     expanded={this.state.expanded === 'GL'}/>
                </NoSsr>
            </div>
        )
    }
}

export default ControlPanel
