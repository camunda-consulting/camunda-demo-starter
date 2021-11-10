/**
 * @author Paul Lungu
 * @type {{DOM, PropTypes, createElement, isValidElement, version, __spread, PureComponent, createMixin, createClass, Children, Component, createFactory, cloneElement}}
 */

'use strict';

// tag::nodeModules[]
const React = require('react');


class Info extends React.Component{
  constructor(props) {
      super(props);
  }

  render(){
      return (
       <div className="row">

         <div className="columns">

         <section className="product-feature-section">
           <div className="product-feature-section-outer">
             {/*<h4 className="product-feature-section-headline">Yeti Sightings Increase After Unclosed Tag Scare</h4>*/}

             <div className="product-feature-section-inner">

               <div className="product-feature-section-feature top-left">
                 <i className="fa fa-shield" aria-hidden="true"></i>
                 <div>
                   <p className="feature-title">Task Info</p>
                   <p className="feature-desc">Task Specific Information</p>
                   <div className="card-section" style={{borderTop: "1px dashed #3adb76"}}>
                       <ul>
                         <li><span className="label">Product</span><span className="data">{this.props.item.product}</span></li>
                         <li><span className="label">PMI Code</span><span className="data">{this.props.item.pmiCode}</span></li>
                         <li><span className="label">Description</span><span className="data">{this.props.item.pmiDescription}</span></li>
                       </ul>
                     </div>
                 </div>
               </div>

               <div className="product-feature-section-feature top-right">
                 <i className="fa fa-heart" aria-hidden="true"></i>
                 <div>
                   <p className="feature-title">Owner</p>
                   <p className="feature-desc">Application Owner Information</p>
                   <div className="card-section" style={{borderTop: "1px dashed #3adb76"}}>
                       <ul>
                           <li><span className="label">QR Code</span><span className="data">{this.props.item.coPolicyNo}</span></li>
                           <li><span className="label">Quantity</span><span className="data">{this.props.item.quantity}</span></li>
                       </ul>
                   </div>
                 </div>
               </div>

               {/*<div className="product-feature-section-feature bottom-left">*/}
               {/*  <i className="fa fa-coffee" aria-hidden="true"></i>*/}
               {/*  <div>*/}
               {/*    <p className="feature-title">Status</p>*/}
               {/*    <p className="feature-desc">Status Information</p>*/}
               {/*    <div className="card-section" style={{borderTop: "1px dashed #3adb76"}}>*/}
               {/*      <ul>*/}
               {/*        <li><span className="label">Assigned Date</span><span className="data">{this.props.task.due} </span></li>*/}
               {/*        <li><span className="label">Due Date</span><span className="data">{this.props.task.application.due} </span></li>*/}
               {/*        <li><span className="label">Queue</span><span className="data">{this.props.task.application.queue}</span></li>*/}
               {/*        <li><span className="label">Started</span><span className="data">{this.props.task.application.started}</span></li>*/}
               {/*        <li><span className="label">Approved</span><span className="data">{this.props.task.application.approved}</span></li>*/}
               {/*      </ul>*/}
               {/*    </div>*/}
               {/*  </div>*/}
               {/*</div>*/}

               {/*<div className="product-feature-section-feature bottom-right">*/}
               {/*  <i className="fa fa-map-marker" aria-hidden="true"></i>*/}
               {/*  <div>*/}
               {/*    <p className="feature-title">Application Info</p>*/}
               {/*    <p className="feature-desc">Application Details</p>*/}
               {/*    <div className="card-section" style={{borderTop: "1px dashed #3adb76"}}>*/}
               {/*      <ul>*/}
               {/*        <li><span className="label">Name</span><span className="data">{this.props.task.application.first} {this.props.task.application.last}</span></li>*/}
               {/*        <li><span className="label">E Mail</span><span className="data">{this.props.task.application.email}</span></li>*/}
               {/*        <li><span className="label">Phone</span><span className="data">{this.props.task.application.phone}</span></li>*/}

               {/*        <li><span className="label">Address</span><span className="data">{this.props.task.application.street} {this.props.task.application.city} {this.props.task.application.zip}</span></li>*/}
               {/*        <li><span className="label">Coverage</span><span className="data">{this.props.task.application.coverageAmount}</span></li>*/}
               {/*        <li><span className="label">Comment</span><span className="data">{this.props.task.application.comment}</span></li>*/}
               {/*      </ul>*/}
               {/*    </div>*/}
               {/*  </div>*/}
               {/*</div>*/}

             </div>
           </div>
         </section>

         </div>
        </div>
      )
  }
  
}
  
module.exports = Info;