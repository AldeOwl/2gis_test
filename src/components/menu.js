import React, { Component } from 'react';
import './../css/menu.css';


class Menu extends Component {
    state = {
        active: 'toread'
    }
    handler(val) {
        this.setState({ active: val })
        window.history.pushState(val, val, `?tab=${val}`)
        this.props.setActiveTab()

    }
    componentDidMount() {
        window.addEventListener('popstate', e => {
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
