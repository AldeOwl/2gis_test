import React, { Component } from 'react';
import ToRead from './toRead';
import InProgress from './inProgress';
import Done from './done';


class Widget extends Component {
    startReading(){
        return (
            <button className="startReading">start reading</button>
        )
    }
    finishReading(){
        return (
            <button className="finishReading">finish reading</button>
        )
    }
    return(){
        return (
            <button className="return">return in "to read"</button>
        )
    }
    render() {
        return (
            <div>
                {this.props.activeTab === 'toread' && <ToRead btn={this.startReading} books={this.props.books} />}
                {this.props.activeTab === 'progress' && <InProgress btn={this.finishReading} />}
                {this.props.activeTab === 'done' && <Done btn={this.return} />}
            </div>
        );
    }
}

export default Widget;
