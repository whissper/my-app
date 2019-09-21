import React from 'react';
import './Timer.css';
import pretendToFetch from '../Utils/pretendToFetch';

class Timer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            counter: 0,
            isLoading: true
        };

        this.tick = this.tick.bind(this);
        this.delClick = this.delClick.bind(this);
        this.incClick = this.incClick.bind(this);
    }

    componentDidMount() {
        pretendToFetch().then((result) => {
            this.setState({ isLoading: false });

            this.timerID = setInterval(
                this.tick,
                1000
            );
        });
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    render() {
        const { counter, isLoading } = this.state;

        if (isLoading) {
            return (
                <div>
                    <div className="timer-container">
                        <i className="fas fa-spinner fa-spin fa-2x"></i>
                        <span className="sr-only">LOADING...</span>
                    </div>
                    <div className="clear"></div>
                </div>
            );
        }

        return (
            <div>
                <div className="timer-container">
                    <span>Ticks have passed: {counter}</span>
                    <button className="btn btn-danger" onClick={this.delClick}>DELETE</button>
                    <button className="btn btn-success" data-toggle="modal" data-target="#myModal" onClick={this.incClick}>INC</button>
                </div>
                <div className="clear"></div>
            </div>
        );
    }

    tick() {
        this.setState((state, props) => {
            return { counter: state.counter + props.increment };
        });
    }

    delClick() {
        this.props.onDelete(this.props.timerID);
    }

    incClick() {
        this.props.onSetInc(this.props);
    }

}

Timer.defaultProps = {
    increment: 1
};

export default Timer;
