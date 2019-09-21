import React from "react";

class ModalWindow extends React.Component {

    constructor(props) {
        super(props);

        this.saveIncrement = this.saveIncrement.bind(this);
        this.cancelInput = this.cancelInput.bind(this);

        this.incrementInput = React.createRef();
    }
    
    componentDidMount() {
        this.incrementInput.current.value = this.props.inputText;
    }

    componentDidUpdate(prevProps) {
        if (prevProps.inputText !== this.props.inputText) {
            this.incrementInput.current.value = this.props.inputText;
        }
    }

    render() {

        const { titleText, inputText } = this.props;

        return (
            <div className="modal fade" id="myModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true" onClick={this.cancelInput} >&times;</span></button>
                            <h4 className="modal-title" id="myModalLabel">Change increment of timer: {titleText}</h4>
                        </div>
                        <div className="modal-body">
                            <div className="input-group">
                                <span className="input-group-addon" id="basic-addon1">increment:</span>
                                <input type="text" className="form-control" placeholder="" aria-describedby="basic-addon1" defaultValue={inputText} ref={this.incrementInput} />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default" data-dismiss="modal" onClick={this.cancelInput} >Cancel</button>
                            <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.saveIncrement} >Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    saveIncrement() {
        this.props.changeIncrement(this.props.titleText, parseInt(this.incrementInput.current.value));
    }

    cancelInput() {
        this.incrementInput.current.value = this.props.inputText;
    }

}

export default ModalWindow;
