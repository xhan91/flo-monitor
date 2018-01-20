import React, {Component} from 'react';
import './Slider.css';

class Slider extends Component {
    render() {
        const { selected } = this.props;
        return (
            <div className="jh-switch jh-item">
                <span className={"jh-slider jh-round " + (selected ? "selected" : "")}></span>
            </div>
        )
    }
}

export default Slider;