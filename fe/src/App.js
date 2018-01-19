import React, { Component } from 'react';
import Station from './Station';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor() {
    super();
    let stations = [{"id":"20489a6b-ac43-4025-ac8a-0dd5ccf77f40","name":"AAA-10311","status":0,"last_updated":"2018-01-18T23:34:37.000Z"},{"id":"89dd06a3-b54c-4d38-9f19-7566ced6a791","name":"AAA-10322","status":0,"last_updated":"2018-01-18T23:34:37.000Z"}];
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
        <div className="container mb-5">
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
