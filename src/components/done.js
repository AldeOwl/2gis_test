import React, { Component } from 'react';
import './../css/done.css';
import Book from './book';


class Done extends Component {
    render() {
        return (
            <div className="done">
                <Book btn={this.props.btn} />
            </div>
        );
    }
}

export default Done;
