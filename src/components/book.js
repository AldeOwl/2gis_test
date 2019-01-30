import React, { Component } from 'react';
import './../css/book.css';


class Book extends Component {
    renderBook () {
        return this.props.books.map(item => (
            <div className="book" key={item.id} id={item.id}>
                <h2 className="author">{item.author}</h2>
                <div className="row">
                    <h1 className="title">{item.title}</h1>
                    <button className="startReading">start reading</button>
                </div>
                <p className="description">{item.description}</p>
                <div className="tagsBar">
                    {item.tags.map((item, index) => ((<button className="tag" key={index}>#{item}</button>)))}
                </div>
            </div>
        ))
    }
    render() {
        console.log(this.props.books)
        return (
            <>
                {this.renderBook()}
            </>
        );
    }
}

export default Book;
