import React, { Component } from 'react';
import './../css/book.css';


class Book extends Component {
    startReading(ev){
        this.props.progress(ev)
    }
    done(ev){
        this.props.done(ev)
    }
    fromDoneInProgress(ev){
        this.props.fromDone(ev)
    }
    setTag(val){
        this.props.setTag(val)
    }
    choseBtn(val, id){
        if(val === 'progress')
            return <button className="startReading" id={id} onClick={(ev)=>{this.startReading(ev.target.id)}}>start reading</button>
        else if(val === 'done')
            return <button className="finishReading" id={id} onClick={(ev)=>{this.done(ev.target.id)}}>finish reading</button>
        else if(val === 'return')
            return <button className="return" id={id} onClick={(ev)=>{this.fromDoneInProgress(ev.target.id)}}>return in "to read"</button>
    }
    renderBook () {
        if(!this.props.books || this.props.books.length === 0){
            return <div className='empty'>List is empty</div>
        }
        else {
            return this.props.books.map(item => (
                <div className="book" key={item.id} id={item.id}>
                    <h2 className="author">{item.author}</h2>
                    <div className="row">
                        <h1 className="title">{item.title}</h1>
                        {this.choseBtn(this.props.btn, item.id)}
                    </div>
                    <p className="description">{item.description}</p>
                    <div className="tagsBar">
                        {item.tags.map((item, index) => ((<button className="tag" onClick={()=>{this.setTag(item)}} key={index}>#{item}</button>)))}
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
