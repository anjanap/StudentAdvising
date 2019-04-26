import React, {Component} from 'react';
import '../css/style.css';
import {withRouter} from 'react-router-dom';
import * as API from "../api/API";

class Approve extends Component {
    state={
        adminsList: []
    };

    componentWillMount() {
        API.getAllInactiveUsers()
            .then((output) => {
                if (output.status != 1)
                    alert("No inactive users in database");
                else {
                    var u = output.inActiveUsers;
                    this.setState({adminsList: u});
                    this.props.history.push("/Approve");
                }
            });
    }


    handleApprove = (id,action,adminstatus) =>{
        var payload= ({userId: id, userActionFromClient:action, makeSuperAdmin:adminstatus});
        API.approveUser(payload)
            .then((output) => {
                if (output.status === 1) {
                    alert("User approved");
                }
            })
    }


    render() {
        return (<div>
            {
                this.props.isadmin==0 ? (
                    <div className="w3-container">
                        <div className="row">
                            <div className="col-sm-4 col-md-4 col-lg-4"/>
                            <div className="col-sm-5 col-md-5 col-lg-5">
                                <h2 style={{color:'red'}}>No Admin Priviledges</h2>
                            </div>
                        </div>
                    </div>
                    ) :
                (
                    <div className="w3-container">
                        <div className="row">
                            <div className="col-sm-4 col-md-4 col-lg-4"/>
                            <div className="col-sm-5 col-md-5 col-lg-5">
                                <h3 className="page-title">Approve Admins</h3>
                            </div>
                        </div>
                        <br/>
                        <div className="row">
                            <div className="col-sm-3 col-md-3 col-lg-3"/>
                            <div className="col-sm-7 col-md-7 col-lg-7">
                                <table className="table-admin" style={{width:"100%"}}>
                                    <tbody>
                                    <tr className="table-content-admin">
                                        <th className="table-content-admin">Name</th>
                                        <th className="table-content-admin">Email</th>
                                        <th className="table-content-admin">Approve</th>
                                    </tr>

                                    {

                                        this.state.adminsList.map(u => {
                                            return (
                                                <tr key={Math.random()} className="table-content-admin">
                                                    <td className="table-content-admin">{u.firstName}  {u.lastName}</td>
                                                    <td className="table-content-admin">{u.email}</td>
                                                    <td className="table-content-admin">
                                                        <button className="btn btn-success btn-sm btn-approve"
                                                                onClick={() => this.handleApprove(u.id, 1, 0)} >Admin</button>
                                                        <button className="btn btn-success btn-sm btn-approve" style={{backgroundColor:'#7F27E3'}}
                                                                onClick={() => this.handleApprove(u.id, 1, 1)}>Super Admin</button>
                                                        <button className="btn btn-danger btn-sm btn-approve glyphicon glyphicon-remove"
                                                                onClick={() => this.handleApprove(u.id, -1, 0)} >
                                                        </button>

                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </div>

                )
        }
        </div>

        );
    }
}

export default withRouter(Approve);