const React = require('react');
const ReactDOM = require('react-dom');

const {Link, IndexLink} = require('react-router');

class FilterBar extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
          callUpdate: function (pageSize, that) {that.props.onFilterAll(pageSize)}
        };
        this.handleNavFirst = this.handleNavFirst.bind(this);
        this.handleNavPrev = this.handleNavPrev.bind(this);
        this.handleNavNext = this.handleNavNext.bind(this);
        this.handleNavLast = this.handleNavLast.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.handlefilterState = this.handlefilterState.bind(this);
        this.handleFilterPriority = this.handleFilterPriority.bind(this);
        this.handleFilterAll = this.handleFilterAll.bind(this);
        this.handleFilterStarted = this.handleFilterStarted.bind(this);
        this.handleRefresh = this.handleRefresh.bind(this);
    }

    // tag::handle-page-size-updates[]
    handleInput(e) {
        e.preventDefault();
        var pageSize = ReactDOM.findDOMNode(this.refs.pageSize).value;
        if (/^[0-9]+$/.test(pageSize)) {
            this.props.updatePageSize(pageSize);
        } else {
            ReactDOM.findDOMNode(this.refs.pageSize).value =
                pageSize.substring(0, pageSize.length - 1);
        }
    }
    // end::handle-page-size-updates[]

    handleRefresh(e){
      e.preventDefault();
      this.state.callUpdate(this.props.pageSize, this);
    }

    handleFilterPriority(e){
      e.preventDefault();
      this.props.onFilterPriority(this.props.pageSize);
      this.setState({
        callUpdate: function (pageSize, that) {that.props.onFilterPriority(pageSize)}
      });
    }

    handleFilterAll(e){
      e.preventDefault();
      this.props.onFilterAll(this.props.pageSize);
      this.setState({
        callUpdate: function (pageSize, that) {that.props.onFilterAll(pageSize)}
      });
    }

    handleFilterStarted(e){
      e.preventDefault();
      this.props.onFilterStarted(this.props.pageSize);
      this.setState({
        callUpdate: function (pageSize, that) {that.props.onFilterStarted(pageSize)}
      });
    }

    handlefilterState(e){
      e.preventDefault();
      this.props.onFilterState(this.props.pageSize);
      this.setState({
        callUpdate: function (pageSize, that) {that.props.onFilterState(pageSize)}
      });
    }

    // tag::handle-nav[]
    handleNavFirst(e){
        e.preventDefault();
        this.props.onNavigate(this.props.links.first.href);
    }

    handleNavPrev(e) {
        e.preventDefault();
        this.props.onNavigate(this.props.links.prev.href);
    }

    handleNavNext(e) {
        e.preventDefault();
        this.props.onNavigate(this.props.links.next.href);
    }

    handleNavLast(e) {
        e.preventDefault();
        this.props.onNavigate(this.props.links.last.href);
    }
    // end::handle-nav[]

  render(){
      var navLinks = [];
      if ("first" in this.props.links) {
          navLinks.push(<a className="button" key="first" onClick={this.handleNavFirst}>&lt;&lt;</a>);
      }
      if ("prev" in this.props.links) {
          navLinks.push(<a className="button" key="prev" onClick={this.handleNavPrev}>&lt;</a>);
      }
      if ("next" in this.props.links) {
          navLinks.push(<a className="button" key="next" onClick={this.handleNavNext}>&gt;</a>);
      }
      if ("last" in this.props.links) {
          navLinks.push(<a className="button" key="last" onClick={this.handleNavLast}>&gt;&gt;</a>);
      }

    return (
       <div className="top-bar">
         <div className="row">
          <div className="small-6 columns">
             <div className="expanded small button-group">
                  <a className="button secondary hollow">{this.props.title}</a>
                  <a className="button secondary" onClick={this.handleFilterStarted}>Started</a>
                  <a className="button" onClick={this.handleFilterAll}>All</a>
             </div>
          </div>
            <div className="small-5 columns">
              <ul className="menu">
                <li>
                    <div className="input-group small">
                        <span className="input-group-label">Page Size</span>
                        <input style={{width: "70px"}} type="number" ref="pageSize"
                          defaultValue={this.props.pageSize} onInput={this.handleInput}/>
                    </div>
                </li>
                  <li>
                      <div className="tiny button-group">
                          {navLinks}
                      </div>
                  </li>
              </ul>
            </div>
            <div className="small-1 columns">
              <a className="button small" key="last" onClick={this.handleRefresh}>Refresh</a>
            </div>
        </div>
       </div>
    )
  }
}

module.exports = FilterBar;
