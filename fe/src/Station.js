import React, {Component} from 'react';
import './Station.css';
import tesla from './imgs/tesla.jpg';
import bike from './imgs/bike.jpg';

class Station extends Component {
    render() {
        const {id, name, status} = this.props.station;
        return (
            <div className="col-sm-6">
                <div className="card">
                    <img className="card-img-top" src={status ? tesla : bike} alt="card image cap"/>
                    <div className={"card-body " + (status ? "bg-success" : "bg-danger")}>
                        <h1>{name}</h1>
                    </div>
                </div>
            </div>            
        )
    }
}

export default Station;