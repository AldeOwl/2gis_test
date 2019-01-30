import React, { Component } from 'react';
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
class ToRead extends Component {
    render() {
        return (
            <div>
                <Book books={items} />
            </div>
        );
    }
}

export default ToRead;
