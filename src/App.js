import React, { Component } from 'react';
import './App.css';
import Menu from './components/menu';
import ToRead from './components/toRead';
import InProgress from './components/inProgress';
import Done from './components/done';
import books from './items.json'

class App extends Component {
    state = {
      activeTab: 'toread',
      tags: [],
      booksList: books,
      read: [],
      progress: [],
      done: []
    }
  checkUrl = () => {
    let searchParams = new URLSearchParams(window.location.search);
    let tab = searchParams.get('tab');
    let tags = searchParams.getAll('tag');
    if (tags.length > 0) {
      tags = tags[0].split(',');
    };
    this.setState({ activeTab: tab });
    this.setState({ tags: tags });
  }
  getFormatBookList(idList) {
    let formattedList = [];
    idList.forEach(id => {
      this.state.booksList.items.forEach(item => {
        if (item.id === id) {
          formattedList.push(item);
        };
      });
    });
    if (this.state.tags.length > 0) {
      let sortList = [];
      formattedList.forEach((item) => {
        if (this.state.tags.every(tag => item.tags.includes(tag))) {
          sortList.push(item);
        };
      });
      return sortList
    };
    return formattedList
  };

  setActiveTab = (val) => {
    this.setState({ activeTab: val });
    window.history.pushState(this.state.activeTab, this.state.activeTab, `?tab=${val}`);
  };

  setTag = (val) => {
    if (!this.state.tags.includes(val)) {
      this.setState(state => state.tags.push(val));
    };
  };

  clearTags = () => { this.setState(state => state.tags = []) };
  
  addInProgress = (val) => {
    this.setState({ read: this.state.read.filter(item => item !== val) });
    this.setState(state => state.progress.push(val));
  };

  addInProgressFromDone = (val) => {
    this.setState({ done: this.state.done.filter(item => item !== val) });
    this.setState(state => state.progress.push(val));
  };

  addInDone = (val) => {
    this.setState({ progress: this.state.progress.filter(item => item !== val) });
    this.setState(state => state.done.push(val));
  };

  componentWillMount() {
    if (localStorage.getItem('read')) {
      this.setState({ read: JSON.parse(localStorage.getItem("read")) });
    };
    if(localStorage.getItem('progress')){
      this.setState({ progress: JSON.parse(localStorage.getItem("progress")) });
    }
    if(localStorage.getItem('done')){
      this.setState({ done: JSON.parse(localStorage.getItem("done")) });
    }
    this.checkUrl();
    window.history.pushState(this.state.activeTab, this.state.activeTab, `?tab=${this.state.activeTab || 'toread'}`);
  };

  componentDidMount() {
    window.history.pushState(this.state.activeTab, this.state.activeTab, `?tab=${this.state.activeTab}`);
    if(!localStorage.getItem('read')){
      let readId = this.state.booksList.items.map(item => item.id)
      this.setState({ read: readId })
    }  
    window.addEventListener('popstate', () => {
      this.checkUrl();
    });
  };

  componentWillUpdate = (nextProps, nextState) => {
    localStorage.setItem("read", JSON.stringify(nextState.read));
    localStorage.setItem("progress", JSON.stringify(nextState.progress));
    localStorage.setItem("done", JSON.stringify(nextState.done));
  }

  render() {
    return (
      <div className="App">
        <Menu setActiveTab={this.setActiveTab}
          active={this.state.activeTab}
          read={this.state.read.length !== 0 ? this.state.read.length : 0}
          progress={this.state.progress.length !== 0 ? this.state.progress.length : 0}
          done={this.state.done.length !== 0 ? this.state.done.length : 0}
        />
        <div className="contentWrap">
          {this.state.tags.length > 0 && <div className='filter'>Filtered by tags:
                                      {this.state.tags.map((item, index) => ((<button className="tag" key={index}>#{item} </button>)))}
            <button className='clearBtn' onClick={this.clearTags}>(clear)</button>
          </div>}

          {this.state.activeTab === 'toread' && <ToRead btn={this.addInProgress} setTag={this.setTag} books={this.getFormatBookList(this.state.read)} />}
          {this.state.activeTab === 'progress' && <InProgress btn={this.addInDone} setTag={this.setTag} books={this.getFormatBookList(this.state.progress)} />}
          {this.state.activeTab === 'done' && <Done btn={this.addInProgressFromDone} setTag={this.setTag} books={this.getFormatBookList(this.state.done)} />}
        </div>
      </div>
    );
  };
};

export default App;
