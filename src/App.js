import React, { Component } from 'react';
import './App.css';
import Menu from './components/menu';
import ToRead from './components/toRead';
import InProgress from './components/inProgress';
import Done from './components/done';

class App extends Component {
  state = {
    activeTab: 0,
  }
  showTab(){
    let id = `${this.state.activeTab}Tab`
    let tab = document.getElementById(id)
    console.log(tab)
  }
  setActiveTab = (val) => {this.setState({activeTab: val})}

  render() {
    console.log(this.state.activeTab)
    this.showTab();
    return (
      <div className="App">
          <Menu setActiveTab={this.setActiveTab} />
          <div className="contentWrap">
            <ToRead  className="inActive" id="toreadTab" />
            <InProgress className="inActive" id="progressTab" />
            <Done className="inActive" id="doneTab" />
          </div>
      </div>
    );
  }
}

export default App;
