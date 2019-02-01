import React, { Component } from 'react';
import Book from './book';


class ToRead extends Component {
    render() {
        console.log(this.props.books)
        return (
            <div>
                <Book books={this.props.books} btn='progress' progress={this.props.btn} />
            </div>
        );
    }
}

export default ToRead;
