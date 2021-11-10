const React = require('react');

class ActionBar extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
        };
        this.handleComplete = this.handleComplete.bind(this);
        // this.handleSave = this.handleSave.bind(this);
    }

    handleComplete(e){
        e.preventDefault();
        console.log("Items -> ActionBar -> handleComplete: " + JSON.stringify(this.props.items));
        this.props.post(this.props.items, `/orders/${this.props.order.id}/itemsOrdered`);
        this.props.onRedirect("/orders")
    }

    handleAdd(e){
        e.preventDefault();

        this.props.toggleForm("addItems");
    }

  render(){

    return (
        <div className="top-bar">
            <div className="top-bar-right columns">
                <ul className="menu my-bar">
                    {/*<li>*/}
                    {/*    <a className="button small my-button" key="add" onClick={this.handleAdd}>Add</a>*/}
                    {/*</li>*/}
                    {/*<li>*/}
                    {/*</li>*/}
                    <li>
                        <a className="button small my-button" key="add" onClick={this.handleComplete}>Complete</a>
                    </li>
                </ul>
            </div>
        </div>
    )
  }
}

module.exports = ActionBar;
