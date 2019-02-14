import React, {Component} from 'react';
import {Route, Link, withRouter} from 'react-router-dom';
import ViewAll from "./ViewAll";
import Unanswered from "./Unanswered";
import Report from "./Report";



class NavigationBar extends Component {
// handleLogout = () => {
// this.props.history.push("/");
//   }
    render() {
        return (
            <div className="w3-container">
              <div className="row">
                <div className="col-sm-1 col-md-1 col-lg-1">
                  <Link to='#'></Link>
                </div>
                <div className="col-sm-3 col-md-3 col-lg-3">
                  <Link to='/ViewAll' className="nav-link">View All</Link>
                </div>
                <div className="col-sm-3 col-md-3 col-lg-3">
                  <Link to='/Unanswered' className="nav-link">Unanswered</Link>
                </div>
                <div className="col-sm-3 col-md-3 col-lg-3">
                  <Link to='/Report' className="nav-link">Report</Link>
                </div>
                <div className="col-sm-1 col-md-1 col-lg-1" style={{align: 'right'}}>
                  <b>Username: {this.props.user}</b>
                </div>
                <div className="col-sm-1 col-md-1 col-lg-1">
                  <button className="btn btn-danger" type="button" onClick={() => this.props.logout()}>LOGOUT</button>
                </div>
              </div>



              {/*<div className="row">
                <div className="col-sm-2 col-md-2 col-lg-2">
                  <div className="row">
                    <Link to='#'></Link>
                  </div>
                  <div className="row">
                    <Link to='/ViewAll' className="nav-link">View All</Link>
                  </div>
                  <div className="row">
                    <Link to='/Unanswered' className="nav-link">Unanswered</Link>
                  </div>
                  <div className="row">
                    <Link to='/Report' className="nav-link">Report</Link>
                  </div>
                  <div className="row">
                    <b>Username: {this.props.user}</b>
                  </div>
                  <div className="row">
                    <button className="btn btn-danger" type="button" onClick={() => this.props.logout()}>LOGOUT</button>
                  </div>
                </div>*/}
                <div className="col-sm-10 col-md-10 col-lg-10">

                              <Route exact path="/ViewAll" render={() => (<ViewAll user={this.props.user}/>)}/>
                              <Route exact path="/Unanswered" render={() => (<Unanswered user={this.props.user}/>)}/>
                              <Route exact path="/Report" render={() => (<Report user={this.props.user}/>)}/>
                </div>
              

            </div>
        );
    }
}

export default withRouter(NavigationBar);
