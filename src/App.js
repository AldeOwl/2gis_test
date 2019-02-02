import React, { Component } from 'react';
import './App.css';
import Menu from './components/menu';
import ToRead from './components/toRead';
import InProgress from './components/inProgress';
import Done from './components/done';
import books from './items.json'

class App extends Component {
  state = {
    activeTab: '',
    tags: [],
    booksList: [],
    read: [],
    progress: [],
    done: []
  }
  
  checkUrl = () => {
    let searchParams = new URLSearchParams(window.location.search);
    let tab = searchParams.get('tab')
    let tags = searchParams.getAll('tag')
    console.log(tags)
    if(tags.length > 0){
      tags = tags[0].split(',')
    }
    this.setState({ activeTab: tab })
    this.setState({ tags: tags})
  }
  getFormatBookList(idList){
    let formattedList = []
    idList.forEach(id => {
      this.state.booksList.items.forEach(item => {
        if(item.id === id){
          formattedList.push(item)
        }
      })
    })
    if(this.state.tags.length > 0){
      let sortList = [];
      formattedList.forEach((item) => {
        this.state.tags.forEach(tag => {
          if(item.tags.includes(tag)){
            sortList.push(item)
          }
        })
      })
      return sortList
    }
    return formattedList
  }
  setActiveTab = (val) => { 
    this.setState({ activeTab: val })
    window.history.pushState(this.state.activeTab, this.state.activeTab, `?tab=${val}` )
  }
  setTag=(val)=>{
    if(!this.state.tags.includes(val)){
      this.setState(state => state.tags.push(val))
    }
  }
  addInProgress=(val)=>{
    this.setState({read : this.state.read.filter(item => item !== val)})
    this.setState(state => state.progress.push(val))
  }
  addInProgressFromDone=(val)=>{
    this.setState({done : this.state.done.filter(item => item !== val)})
    this.setState(state => state.progress.push(val))
  }
  addInDone=(val)=>{
    this.setState({progress : this.state.progress.filter(item => item !== val)})
    this.setState(state => state.done.push(val))
  }
  componentWillMount() {
    this.setState({ booksList: books })
    this.checkUrl();
    window.history.pushState(this.state.activeTab, this.state.activeTab, `?tab=${this.state.activeTab || 'toread'}` )
  }
  componentDidMount() {
    window.history.pushState(this.state.activeTab, this.state.activeTab, `?tab=${this.state.activeTab || 'toread'}` )
    let readId = this.state.booksList.items.map(item => item.id)
    this.setState({ read: readId})
    window.addEventListener('popstate', () => {
      this.checkUrl();
    })
  }
  render() {
    console.log(this.state.tags)
    return (
      <div className="App">
        <Menu setActiveTab={this.setActiveTab} 
              active={this.state.activeTab}
              read={this.state.read.length !== 0 ? this.state.read.length : 0}
              progress={this.state.progress.length !== 0 ? this.state.progress.length : 0}
              done={this.state.done.length !== 0 ? this.state.done.length : 0}
        />
        <div className="contentWrap">
          {this.state.activeTab === 'toread' && <ToRead btn={this.addInProgress} setTag={this.setTag} books={this.getFormatBookList(this.state.read)} />}
          {this.state.activeTab === 'progress' && <InProgress btn={this.addInDone} setTag={this.setTag} books={this.getFormatBookList(this.state.progress)} />}
          {this.state.activeTab === 'done' && <Done btn={this.addInProgressFromDone} setTag={this.setTag} books={this.getFormatBookList(this.state.done)} />}
        </div>
      </div>
    );
  }
}

export default App;
