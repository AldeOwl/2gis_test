import React, { Component } from 'react';
import './../css/menu.css';


class Menu extends Component {
    state = {
        active: ''
    }
    handler(val) {
        this.setState({ active: val })
        this.props.setActiveTab(val)
    }
    componentWillMount() {
        this.setState({ active: this.props.active })
    }
    componentDidMount() {
        window.addEventListener('popstate', () => {
            let searchParams = new URLSearchParams(window.location.search);
            let tab = searchParams.get('tab')
            this.setState({ active: tab })
        })
    }
    render() {
        return (
            <nav className="menu">
                <a className={this.state.active === 'toread' ? 'menuItemActive' : 'menuItem'}
                    onClick={() => { this.handler('toread') }}>{`To read(${this.props.read})`}
                </a>
                <a className={this.state.active === 'progress' ? 'menuItemActive' : 'menuItem'}
                    onClick={() => { this.handler('progress') }}>{`In progress(${this.props.progress})`}
                </a>
                <a className={this.state.active === 'done' ? 'menuItemActive' : 'menuItem'}
                    onClick={() => { this.handler('done') }}>{`Done(${this.props.done})`}
                </a>
            </nav>
        );
    }
}

export default Menu;
