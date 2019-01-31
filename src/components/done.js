import React, { Component } from 'react';
import './../css/done.css';
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
class Done extends Component {
    render() {
        return (
            <div className="done">
                <Book books={items.l} btn={this.props.btn} />
            </div>
        );
    }
}

export default Done;
