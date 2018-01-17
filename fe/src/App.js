import React, { Component } from 'react';
import Station from './Station';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor() {
    super();
    let stations = [
      {
        name: 'station1',
        id: '1',
        status: 1
      }
    ];
    stations = [];
    this.state = {
      stations: stations
    }
    this.getStations = this.getStations.bind(this);
  }

  getStations() {
    const url = '/api/stations';
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    fetch(url, {
      headers: headers,
    }).then(res => {
      return res.json();
    }).then(data => {
      this.setState({stations: data});
    });
  }

  componentWillMount() {
    this.getStations();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Flo Monitor</h1>
        </header>
        <div className="container mt-5">
          <div className="row">
            {this.state.stations.map((station) => {
              return <Station station={station} />
            })}
          </div>
        </div>                
      </div>
    );
  }
}

export default App;
