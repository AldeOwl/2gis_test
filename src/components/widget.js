import React, { Component } from 'react';
import ToRead from './toRead';
import InProgress from './inProgress';
import Done from './done';


class Widget extends Component {
    render() {
        return (
            <div>
                {this.props.activeTab === 'toread' && <ToRead btn={this.props.addInProgress} books={this.props.read} />}
                {this.props.activeTab === 'progress' && <InProgress btn={this.finishReading} />}
                {this.props.activeTab === 'done' && <Done btn={this.return} />}
            </div>
        );
    }
}

export default Widget;
