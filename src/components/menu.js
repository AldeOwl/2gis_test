import React, { Component } from 'react';
import './../css/menu.css';


class Menu extends Component {
    state = {
        active: ''
    }
    handler (val){
        this.props.setActiveTab(val)
        this.setState({active: val})
    }
    render() {
        return (
            <nav className="menu">
                <a  className={this.state.active === 'toread' ? 'menuItemActive' : 'menuItem'} onClick={()=>{this.handler('toread')}}>{`To read(${this.props.read})`}</a>
                <a  className={this.state.active === 'progress' ? 'menuItemActive' : 'menuItem'} onClick={()=>{this.handler('progress')}}>In progress</a>
                <a  className={this.state.active === 'done' ? 'menuItemActive' : 'menuItem'} onClick={()=>{this.handler('done')}}>Done</a>
            </nav>
        );
    }
}

export default Menu;
