import React, { Component } from 'react';
import Book from './book';


class ToRead extends Component {
    render() {
        return (
            <div>
                <Book books={this.props.books} btn={this.props.btn} />
            </div>
        );
    }
}

export default ToRead;
