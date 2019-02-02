import React, { Component } from 'react';
import Book from './book';


class ToRead extends Component {
    render() {
        return (
            <div>
                <Book books={this.props.books} btn='progress' progress={this.props.btn} setTag={this.props.setTag} />
            </div>
        );
    }
}

export default ToRead;
