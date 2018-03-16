import React, {Component} from 'react';
import './Station.css';
import tesla from './imgs/tesla.jpg';
import bike from './imgs/bike.jpg';
import * as ta from 'time-ago';

class Station extends Component {

    convert_to_h_m(time) {
        const hh = Math.floor(time / 1000 / 60 / 60);
        time -= hh * 1000 * 60 * 60;
        const mm = Math.floor(time / 1000 / 60);
        return `${hh} hours ${mm} minutes`;
    }

    render() {
        const {id, name, status, last_updated, last_status_changed} = this.props.station;
        const last_updated_ts = new Date(last_updated);
        const charing_time = last_updated_ts - new Date(last_status_changed);
        return (
            <div className="col-sm-6">
                <div className="card  mt-5">
                    <img className="card-img-top" src={status ? tesla : bike} alt="card image cap"/>
                    <div className={"card-body " + (status ? "bg-success" : "bg-danger")}>
                        <h1>{name}</h1>
                        { !status && 
                            <p>Charged for {this.convert_to_h_m(charing_time)}.</p>
                        }
                    </div>
                </div>
            </div>            
        )
    }
}

export default Station;