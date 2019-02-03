import React, { Component } from 'react';
import './App.css';
import Menu from './components/menu';
import books from './items.json'
import moreBooks from './30000-items.json'
import Book from './components/book';


let target = {
  read:'progress',
  progress: 'done',
  done: 'progress'
};


class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      activeTab: 'read',
      tags: [],
      booksList: books,
      read: [],
      progress: [],
      done: []
    }
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
        if(item.id === id) {
          formattedList.push(item);
        };
      });
    });
    if (this.state.tags.length > 0) {
      let sortList = [];
      formattedList.forEach((item) => {
        if(this.state.tags.every(tag => item.tags.includes(tag))) {
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
    if(!this.state.tags.includes(val)) {
      this.setState(state => state.tags.push(val));
    };
  };

  clearTags = () => { this.setState(state => state.tags = []) };

  moveBook = (id) => {
    this.setState({[this.state.activeTab]: this.state[this.state.activeTab].filter(item => item !== id) });
    this.setState(state => state[target[this.state.activeTab]].push(id));
  };

  componentWillMount() {
    if(localStorage.getItem('read')) {
      this.setState({ read: JSON.parse(localStorage.getItem("read")) });
    };
    if(localStorage.getItem('progress')){
      this.setState({ progress: JSON.parse(localStorage.getItem("progress")) });
    }
    if(localStorage.getItem('done')){
      this.setState({ done: JSON.parse(localStorage.getItem("done")) });
    }
    let readId = this.state.booksList.items.map(item => item.id)
    this.setState({ read: readId })
    this.checkUrl();
    window.history.pushState(this.state.activeTab, this.state.activeTab, `?tab=${this.state.activeTab || 'read'}`);
  };

  componentDidMount() {
    window.history.pushState(this.state.activeTab, this.state.activeTab, `?tab=${this.state.activeTab}`);
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
              read={this.state.read.length}
              progress={this.state.progress.length}
              done={this.state.done.length}
        />
        <div className="contentWrap">
          {this.state.tags.length > 0 && <div className='filter'>Filtered by tags:
                                            {this.state.tags.map((item, index) => ((<button className="tag" key={index}>#{item} </button>)))}
                                            <button className='clearFilter' onClick={this.clearTags}>(clear)</button>
                                          </div>}

          <Book books={this.getFormatBookList(this.state[this.state.activeTab])} active={this.state.activeTab} btn={this.moveBook} setTag={this.setTag} />

        </div>
      </div>
    );
  };
};

export default App;
