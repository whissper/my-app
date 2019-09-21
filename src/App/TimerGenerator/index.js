import React from 'react';
import './TimerGenerator.css';

class TimerGenerator extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    render() {
        return (
            <div className="generator">
                <button className="btn btn-default" onClick={this.handleClick}>Add</button>
            </div>
        );
    }

    handleClick() {
        this.props.addNewTimer();
    }
}


export default TimerGenerator;