import React, { Component } from 'react';
import './App.css';
import Menu from './components/menu';
import Widget from './components/widget';
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
    this.setState({ activeTab: tab })
    this.setState({ tags: tags })
  }
  returnFormatBookList(idList){
    let formattedList = [];
    idList.forEach(id => {
      this.state.booksList.items.forEach(item => {
        if(item.id === id)
          formattedList.push(item)
      })
    }) 
    return formattedList
  }
  deleteFromRead(id){
    // let newArr = arr.filter(item => item.id !== id)
    this.setState({read : this.state.read.filter(item => item !== id)})
  }
  addInProgress=(val)=>{
    this.deleteFromRead(val)
    this.setState(state => {
      const list = state.progress.push(val);
      return list
    })
    // let newProgress = this.state.progress.map(item=>item)
    // newProgress.push(val)
    // this.setState({progress: newProgress})
    // this.deleteID(val, this.state.read)
  }
  componentWillMount() {
    this.setState({ booksList: books })
    this.checkUrl();
    this.setState({activeTab: 'toread'})
    window.history.pushState(this.state.activeTab, this.state.activeTab, `?tab=toread` )
  }
  componentDidMount() {
    let readId = this.state.booksList.items.map(item => item.id)
    this.setState({ read: readId})
    window.addEventListener('popstate', e => {
      this.checkUrl();
    })
  }
  // setActiveTab = (val) => { this.setState({ activeTab: val }) }
  
  render() {
    return (
      <div className="App">
        <Menu setActiveTab={this.checkUrl} 
              read={this.state.read.length !== 0 ? this.state.read.length : 0}
              progress={this.state.progress.length !== 0 ? this.state.progress.length : 0}
              done={this.state.done.length !== 0 ? this.state.done.length : 0}
        />
        <div className="contentWrap">
          <Widget activeTab={this.state.activeTab}
                  tags={this.state.tags}
                  addInProgress={this.addInProgress}
                  read={this.returnFormatBookList(this.state.read)} />
        </div>
      </div>
    );
  }
}

export default App;
