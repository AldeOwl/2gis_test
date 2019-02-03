import React, { Component } from 'react';
import Book from './book';


class Done extends Component {
    render() {
        return (
            <div className="done">
                <Book books={this.props.books} btn='return' fromDone={this.props.btn} setTag={this.props.setTag} />
            </div>
        );
    };
};

export default Done;
