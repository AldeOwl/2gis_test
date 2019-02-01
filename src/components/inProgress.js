import React, { Component } from 'react';
import Book from './book';

class InProgress extends Component {
    render() {
        return (
            <div className="progress">
                <Book />
            </div>
        );
    }
}

export default InProgress;
