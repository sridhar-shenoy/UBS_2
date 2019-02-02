import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

/**
 * This is a menu pop up in modal if right clicked
 */
class ClickActionOfTableInModal extends React.Component {

    render() {
        const { anchorEl } = this.props;

        return (
            <div>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    open={this.props.open}
                    onClose={this.props.handleMenuClose}
                >
                    <MenuItem
                        onClick={event => this.props.handleMenuClickClose(event)}
                        onContextMenu={event => event.preventDefault()}
                    >
                        {this.props.textDisplay}
                    </MenuItem>
                </Menu>
            </div>
        );
    }
}

export default ClickActionOfTableInModal;