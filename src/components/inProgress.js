import React, { Component } from 'react';
import Book from './book';

class InProgress extends Component {
    render() {
        return (
            <div className="progress">
                <Book books={this.props.books} btn='done' done={this.props.btn} setTag={this.props.setTag} />
            </div>
        );
    }
}

export default InProgress;
