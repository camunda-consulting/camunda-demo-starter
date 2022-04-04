const ReactDOM = require('react-dom');
const React = require('react');
const {Link, IndexLink} = require('react-router');

class NoteDialog extends React.Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        if(e.keyCode == 13){
            var updatedRenewal = {};
            if(this.refs.note.value){
                updatedRenewal.note = this.refs.note.value;
                updatedRenewal.renewalId = this.props.renewal.id;
            }
            this.props.onUpdateNote(this.props.renewal, updatedRenewal);
        }
    }

    handleHover(e){
        e.preventDefault();
        
    }
    
    render() {

        return (
            <div>
                <a>
                <form onKeyUp={this.handleSubmit}>
                    <input type="text" ref="note" defaultValue={this.props.renewal.note} />
                </form>
                </a>
                <div className="note">{this.props.renewal.note}</div>
            </div>    
        )
    }

};

module.exports = NoteDialog;
