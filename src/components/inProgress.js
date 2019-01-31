import React, { Component } from 'react';
import './../css/progress.css';
import Book from './book';

let items = [{
    id: "uniq id",
    author: "Author",
    title: "Title",
    description: "Description",
    tags: [
        "one",
        "another"
    ]
}]


class InProgress extends Component {
    render() {
        return (
            <div className="progress">
                <Book books={items} btn={this.props.btn} />
            </div>
        );
    }
}

export default InProgress;
