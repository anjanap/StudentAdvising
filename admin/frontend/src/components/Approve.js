import React, {Component} from 'react';
import '../css/style.css';
import {MDBBtn} from "mdbreact";
import * as API from "../api/API";

class Approve extends Component {
    state={
        adminsList: [
            {id: 1, firstName: 'Anjana', lastName: 'Pradeep', email: 'a@a.com'},
            {id:2, firstName: 'Ujjval', lastName: 'Soni', email: 'u@u.com'}]
    };

    handleApprove = (input) =>{
        var payload= ({userid: input});
        // API.deleteQuestionAndAnswer(payload)
        //     .then((output) => {
        //         if (output.status === 1) {
        //             alert("User approved");
        //         }
        //     })
    }

    handleDisapprove = (input) =>{
        var payload= ({userid: input});
        // API.deleteQuestionAndAnswer(payload)
        //     .then((output) => {
        //         if (output.status === 1) {
        //             alert("User not approved");
        //         }
        //     })
    }


    render() {
        console.log(this.props.validateuser);
        return (
            <div className="w3-container">
                <div className="row">
                    <div className="col-sm-4 col-md-4 col-lg-4"/>
                    <div className="col-sm-5 col-md-5 col-lg-5">
                        <h3 className="page-title">Approve Admins</h3>
                    </div>
                </div>
                <br/>
                <div className="row">
                    <div className="col-sm-4 col-md-4 col-lg-4"/>
                    <div className="col-sm-5 col-md-5 col-lg-5">
                        <table className="table-admin" style={{width:"100%"}}>
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
                                                <button className="btn btn-success btn-sm btn-approve glyphicon glyphicon-ok"
                                                        onClick={() => this.handleApprove(u.id)}>
                                                </button>
                                                <button className="btn btn-danger btn-sm btn-approve glyphicon glyphicon-remove"
                                                        onClick={() => this.handleDisapprove(u.id)} >
                                                </button>

                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </table>
                    </div>
                </div>

            </div>
        );
    }
}

export default Approve;
