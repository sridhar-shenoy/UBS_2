import React from 'react';
import {countEntries, getRespondWithQueryString} from '../query_script/SearchES.js'
import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'

class SearchField extends React.component {
    constructor(props){
        super(props);
        this.state = {
            id_value: '',
            text_show: '',
            type_selected: {
                proxy: false,
                event: false,
                gateway: false
            }
        };
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.handleTextSubmit = this.handleTextSubmit.bind(this);
        this.toggleOption = this.toggleOption.bind(this);
        this.getBsStyle = this.getBsStyle.bind(this);
    }

    handleTextChange(e){
        this.setState({id_value: e.target.value})
    }

    async handleTextSubmit(e){
        e.preventDefault();
        if(!this.state.id_value.length){
            return;
        }
        this.props.updateCollideId([]);
        if(this.state.id_value === '10000'){
            this.props.updateCollideId(['proxy', 'gateway'])
        } else if(this.state.id_value === '20000'){
            this.props.updateCollideId(['proxy', 'event', 'gateway'])
        }
        this.setState(state => ({
            text_show: state.id_value.value
        }));

        this.setState({text_show: this.state.id_value + "   " + this.state.type});
        let respond = await getRespondWithQueryString(this.state.id_value);
        this.props.updateQueryResult(respond);
    }

    handleSelectChange(e){
        this.setState({type: e.target.value})
    }

    toggleOption(e) {
        const key = e.target.value; // e.g. 'A'
        const value = !this.state.type_selected[key];
        const newSelected = Object.assign(this.state.type_selected, {[key]: value});
        this.setState({ type_selected: newSelected });
        this.props.updateChosenId(this.state.type_selected);
        // console.log('this.state', this.state);
    }

    getBsStyle(key) {
        return this.state.type_selected[key] ? 'primary' : 'default';
    }

    render() {
        return (
            <div id = "collision_container">
                <form onSubmit={this.handleTextSubmit}>
                    <FormControl fullWidth={true}>
                        <InputLabel htmlFor="">Search for trade ID</InputLabel>
                        <Input id="textIdSearch" value={this.state.id_value} onChange={this.handleTextChange} placeholder="Input the ID" fullWidth={true}/>
                    </FormControl>
                </form>
            </div>
        );
    }
}

export default SearchField;
