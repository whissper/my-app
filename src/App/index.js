import React from 'react';
import './App.css';
import Timer from './Timer';
import TimerGenerator from './TimerGenerator';
import LightCover from './LightCover';
import pretendToFetch from './Utils/pretendToFetch';
import ModalWindow from './ModalWindow';


class App extends React.Component {

    constructor(props) {
        super(props);

        /**
         * bind context before setting up timers in state
         * and afterwards this method is going to be assigned to property "onDelete"
         */
        this.deleteTimer = this.deleteTimer.bind(this);

        this.addTimer = this.addTimer.bind(this);
        this.chooseTimer = this.chooseTimer.bind(this);

        this.updateIncrement = this.updateIncrement.bind(this);

        this.startLocking = this.startLocking.bind(this);
        this.stopLocking = this.stopLocking.bind(this);

        this.state = {
            timers: [
                <Timer key="1" timerID="1a" increment={2}
                    onDelete={this.deleteTimer}
                    onSetInc={this.chooseTimer} />,
                <Timer key="2" timerID="2b" increment={4}
                    onDelete={this.deleteTimer}
                    onSetInc={this.chooseTimer} />,
                <Timer key="3" timerID="3c" increment={12}
                    onDelete={this.deleteTimer}
                    onSetInc={this.chooseTimer} />
            ],
            timerIsLoading: true,
            modalWindowParams: { title: 'Unknown', inputVal: '0' }
        };
    }

    componentDidMount() {
        this.startLocking();

        pretendToFetch().then((result) => {
            this.stopLocking();
        });
    }

    render() {
        const { timers, timerIsLoading, modalWindowParams } = this.state;

        return (
            <div className="TimersTable container">
                <div className="row">
                    <div className="col-md-6 col-md-offset-3">
                        <TimerGenerator addNewTimer={this.addTimer} />
                        {timerIsLoading ? null : timers}
                        <LightCover isLoading={timerIsLoading} />
                        <ModalWindow titleText={modalWindowParams.title}
                            inputText={modalWindowParams.inputVal}
                            changeIncrement={this.updateIncrement} />
                    </div>
                </div>
            </div>
        );
    }

    deleteTimer(id) {
        /* this.setState((state, props) => {
            return {timers: state.timers.filter(
                (timer) => {return timer.props.timerID !== id;}
            )};
        }); */
        this.setState((state) => (
            {
                timers: state.timers.filter(
                    (timer) => timer.props.timerID !== id
                )
            }
        ));
    }

    addTimer() {
        const lastTimer = this.state.timers.length ?
            this.state.timers[this.state.timers.length - 1] :
            <Timer key="1"
                timerID="1a"
                onDelete={this.deleteTimer}
                onSetInc={this.chooseTimer} />;

        const keyVal = parseInt(lastTimer.key) + 1;
        const timerIDVal = keyVal + "e";
        const newTimer = <Timer key={keyVal}
            timerID={timerIDVal}
            onDelete={this.deleteTimer}
            onSetInc={this.chooseTimer} />;

        this.setState((state) => (
            {
                timers: state.timers.concat(newTimer)
            }
        ));
    }

    updateIncrement(timerID, incrementVal) {
        let freshTimers = [];

        this.state.timers.forEach((el) => {
            if (el.props.timerID === timerID) {
                freshTimers.push(<Timer key={el.key}
                    timerID={el.props.timerID}
                    increment={incrementVal}
                    onDelete={this.deleteTimer}
                    onSetInc={this.chooseTimer} />
                );
            } else {
                freshTimers.push(el);
            }
        });

        this.setState((state) => (
            { timers: freshTimers }
        ));
    }

    chooseTimer(timer) {
        this.setState((state) => (
            { modalWindowParams: { title: timer.timerID, inputVal: timer.increment } }
        ));
    }

    startLocking() {
        this.setState((state) => ({ timerIsLoading: true }));
    }

    stopLocking() {
        this.setState((state) => ({ timerIsLoading: false }));
    }
}

export default App;
