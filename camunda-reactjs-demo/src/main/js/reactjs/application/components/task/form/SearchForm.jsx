/**
 * @author Paul Lungu
 * @type {{DOM, PropTypes, createElement, isValidElement, version, __spread, PureComponent, createMixin, createClass, Children, Component, createFactory, cloneElement}}
 */

'use strict';

// tag::nodeModules[]
var React = require('react');

// tag::customComponents

// tag::vars[]
// end::vars[]

class SearchForm extends React.Component {
        
  constructor(props) {
    super(props);
    this.state = {

    };
    this.handleChange = this.handleChange.bind(this);
  }

    handleChange(e){
        e.preventDefault();
        var item = this.props.item;
        item.id = this.refs.itemId.value;
        this.props.handleUpdate(item);
    }

  render() {

      var itemId = "";
      if (this.props.item != null){
          itemId = this.props.item.id;
      }

    return (

        <div className="my-form search-form">
            <div className="small-12 large-12 small-offset-1 columns" >

                <div className="small-9 large-9">
                    <div className="input-group">
                        <span className="input-group-label">Search</span>
                        <input className="input-group-field" type="text"
                               ref="itemId" onChange={this.handleChange}
                               value={itemId} />
                    </div>
                </div>

            </div>
        </div>


    );
  }
}

module.exports = SearchForm;
