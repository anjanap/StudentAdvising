import React, {Component} from 'react';
import {Route, Link, withRouter} from 'react-router-dom';
import ViewAll from "./ViewAll";
import Unanswered from "./Unanswered";
import NewQuestion from "./NewQuestion";
import History from "./History";



class NavigationBar extends Component {
// handleLogout = () => {
// this.props.history.push("/");
//   }

    render() {
      console.log(this.props.validateuser);
        return (
            <div className="w3-container">
              <div className="row">
                <div className="col-sm-1 col-md-1 col-lg-1">
                  <Link to='#'></Link>
                </div>
                <div className="col-sm-2 col-md-2 col-lg-2">
                  <Link to='/ViewAll' className="nav-link">Database</Link>
                </div>
                <div className="col-sm-2 col-md-2 col-lg-2">
                  <Link to='/NewQuestion' className="nav-link">New Question</Link>
                </div>
                <div className="col-sm-2 col-md-2 col-lg-2">
                  <Link to='/Unanswered' className="nav-link">Unanswered</Link>
                </div>
                <div className="col-sm-2 col-md-2 col-lg-2">
                  <Link to='/History' className="nav-link">History</Link>
                </div>
                <div className="col-sm-1 col-md-1 col-lg-1" style={{align: 'right'}}>
                  <b>{this.props.user}</b>
                </div>
                <div className="col-sm-1 col-md-1 col-lg-1">
                  <button className="btn btn-danger btn-logout" type="button" onClick={() => this.props.logout()} style={{align: 'left'}}>LOGOUT</button>
                </div>
              </div>
<hr className="nav-hr" />


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
                  <Route exact path="/NewQuestion" render={() => (<NewQuestion user={this.props.user}/>)}/>
                  <Route exact path="/Unanswered" render={() => (<Unanswered user={this.props.user}/>)}/>
                  <Route exact path="/History" render={() => (<History user={this.props.user}/>)}/>
                </div>


            </div>
        );
    }
}

export default withRouter(NavigationBar);
