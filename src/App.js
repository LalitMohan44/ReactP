import React, { Component } from 'react';
import './App.css';
import Search from './components/Search/Search';
import Data from "./assets/userMockData.json"

class App extends Component {
  constructor() {
    super();

    this.state = {
        data: Data
    }
}

  render() {
    return (
      <div className="search-app">
        <Search data={this.state.data}></Search>
      </div>
    );
  }
}

export default App;
