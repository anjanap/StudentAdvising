import React, {Component} from 'react';
import {Route, Link, withRouter} from 'react-router-dom';
import ViewAll from "./ViewAll";
import Unanswered from "./Unanswered";
import NewQuestion from "./NewQuestion";
import Approve from "./Approve";
import Feedback from "./Feedback";
import '../css/style.css';
import * as API from "../api/API";

class NavigationBar extends Component {
// handleLogout = () => {
// this.props.history.push("/");
//   }

    render() {
        console.log(this.props.validateuser);
        return (
            <div className="w3-container" style={{backgroundColor: '#061860'}}>
                <div className="row">

                    <div className="col-sm-1 col-md-1 col-lg-1" style={{maxHeight: "25px"}}>
                        <p className="nav-logo">SJSU</p>
                    </div>
                    <div className="col-sm-2 col-md-2 col-lg-2">
                        <Link to='#'></Link>
                    </div>
                    <div className="col-sm-1 col-md-1 col-lg-1" >
                        <Link to='/ViewAll' className="nav-link nav-text">Database</Link>
                    </div>
                    <div className="col-sm-1 col-md-1 col-lg-1">
                        <Link to='/NewQuestion' className="nav-link nav-text">New Question</Link>
                    </div>
                    <div className="col-sm-1 col-md-1 col-lg-1">
                        <Link to='/Unanswered' className="nav-link nav-text">Unanswered Questions</Link>
                    </div>
                    <div className="col-sm-1 col-md-1 col-lg-1">
                        <Link to='/Approve' className="nav-link nav-text">Approve</Link>
                    </div>
                    <div className="col-sm-1 col-md-1 col-lg-1">
                        <Link to='/Feedback' className="nav-link nav-text">Feedback</Link>
                    </div>
                    <div className="col-sm-1 col-md-1 col-lg-1">
                    </div>
                    <div className="col-sm-2 col-md-2 col-lg-2">
                        <p className="nav-text" style={{float: "right"}}>{this.props.user}</p>
                    </div>
                    <div className="col-sm-1 col-md-1 col-lg-1">
                        <button className="btn btn-danger btn-logout" type="button" onClick={() => this.props.logout()}>LOGOUT</button>
                    </div>
                </div>
                <hr className="nav-hr"/>
                <div className="col-sm-10 col-md-10 col-lg-10">
                    <Route exact path="/ViewAll" render={() => (<ViewAll user={this.props.user}/>)}/>
                    <Route exact path="/NewQuestion" render={() => (<NewQuestion user={this.props.user}/>)}/>
                    <Route exact path="/Unanswered" render={() => (<Unanswered user={this.props.user}/>)}/>
                    <Route exact path="/Feedback" render={() => (<Feedback user={this.props.user}/>)}/>
                    <Route exact path="/Approve" render={() => (<Approve user={this.props.user} isadmin={this.props.isadmin}/>)}/>
                </div>
            </div>
        );
    }
}

export default withRouter(NavigationBar);
