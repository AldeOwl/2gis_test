import React, { Component } from 'react';
import './../css/progress.css';
import Book from './book';

class InProgress extends Component {
    render() {
        return (
            <div className="progress">
                <Book btn={this.props.btn} />
            </div>
        );
    }
}

export default InProgress;
