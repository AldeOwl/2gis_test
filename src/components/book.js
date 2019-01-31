import React, { Component } from 'react';
import './../css/book.css';


class Book extends Component {
    renderBook () {
        if(!this.props.books){
            return <div className='empty'>List is empty</div>
        }
        else {
            return this.props.books.map(item => (
                <div className="book" key={item.id} id={item.id}>
                    <h2 className="author">{item.author}</h2>
                    <div className="row">
                        <h1 className="title">{item.title}</h1>
                        {this.props.btn()}
                    </div>
                    <p className="description">{item.description}</p>
                    <div className="tagsBar">
                        {item.tags.map((item, index) => ((<button className="tag" key={index}>#{item}</button>)))}
                    </div>
                </div>
            ))
        }
    }
    render() {
        return (
            <>
                {this.renderBook()}
            </>
        );
    }
}

export default Book;
