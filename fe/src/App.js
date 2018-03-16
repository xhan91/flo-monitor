import React, { Component } from 'react';
import Station from './Station';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor() {
    super();
    let stations = [{"id":"20489a6b-ac43-4025-ac8a-0dd5ccf77f40","name":"AAA-10311","status":0,"last_updated":"2018-03-16T21:29:47.000Z","last_status_changed":"2018-03-16T21:11:47.000Z"},{"id":"89dd06a3-b54c-4d38-9f19-7566ced6a791","name":"AAA-10322","status":1,"last_updated":"2018-03-16T21:29:47.000Z","last_status_changed":"2018-03-16T20:28:39.000Z"}];
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
    // 5 mins no updates, treat offline
    const { stations } = this.state;
    const last_updated = stations[0] && stations[0].last_updated;
    const last_updated_ts = new Date(last_updated);    
    const is_offline = (new Date() - last_updated_ts) > 5 * 60 * 1000;
    const title = is_offline ? "Service Offline" : "Welcome to Flo Monitor";
    return (
      <div className="App">
        <header className={"App-header " + (is_offline ? "offline" : "") }>
          { !is_offline &&
            <img src={logo} className="App-logo" alt="logo" />
          }
          <h1 className="App-title">{title}</h1>
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
