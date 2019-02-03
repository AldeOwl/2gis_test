import React, { Component } from 'react';
import './../css/book.css';


let style = {
    read: 'startReading',
    progress: 'finishReading',
    done: 'done'
}
let textBtn = {
    read: 'start reading',
    progress: 'finish reading',
    done: 'return in "to read"'
}
class Book extends Component {
    moveBook(ev) {
        this.props.btn(ev);
    };
    setTag(val) {
        this.props.setTag(val);
    };

    render() {
        if (!this.props.books || this.props.books.length === 0) {
            return <div className='empty'>List is empty</div>
        }
        else {
            return this.props.books.map(item => (
                <div className="book" key={item.id} id={item.id}>
                    <h2 className="author">{item.author}</h2>
                    <div className="row">
                        <h1 className="title">{item.title}</h1>
                        <button className={style[this.props.active]} id={item.id} onClick={(ev) => { this.moveBook(ev.target.id) }}>{textBtn[this.props.active]}</button>
                    </div>
                    <p className="description">{item.description}</p>
                    <div className="tagsBar">
                        {item.tags.map((item, index) => ((<button className="tag" onClick={() => { this.setTag(item) }} key={index}>#{item}</button>)))}
                    </div>
                </div>
            ));
        }
    };
};

export default Book;
