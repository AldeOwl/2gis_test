import React, { Component } from 'react';
import './App.css';
import Menu from './components/menu';
import Widget from './components/widget';
import books from './items.json'

class App extends Component {
  state = {
    activeTab: '',
    tags: [],
    booksList: []
  }
  
  checkUrl() {
    let searchParams = new URLSearchParams(window.location.search);
    let tab = searchParams.get('tab')
    let tags = searchParams.getAll('tag')
    this.setState({ activeTab: tab })
    this.setState({ tags: tags })
  }
  componentWillMount() {
    this.setState({ booksList: books })
    this.checkUrl();
    // this.setState({activeTab: 'toread'})

  }
  setActiveTab = (val) => { this.setState({ activeTab: val }) }

  render() {
    return (
      <div className="App">
        <Menu setActiveTab={this.setActiveTab} read={this.state.booksList.items.length} />
        <div className="contentWrap">
          <Widget activeTab={this.state.activeTab} tags={this.state.tags} books={this.state.booksList.items} />
        </div>
      </div>
    );
  }
}

export default App;
