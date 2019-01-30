import React, { Component } from 'react';
import './../css/menu.css';


class Menu extends Component {

    handler = (ev) => (
        this.props.setActiveTab(ev.target.id)
    )
    render() {
        return (
            <nav className="menu">
                <a className="menuItem" id="toread" onClick={this.handler}>To read</a>
                <a className="menuItem" id="progress" onClick={this.handler}>In progress</a>
                <a className="menuItem" id="done" onClick={this.handler}>Done</a>
            </nav>
        );
    }
}

export default Menu;
