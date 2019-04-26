import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import * as API from '../api/API';
import {MDBTable, MDBBtn, MDBDataTable} from 'mdbreact';
import Modal from 'react-responsive-modal';
import '../css/style.css';
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-dt';
import 'datatables.net-buttons';
import 'datatables.net-buttons-dt';


class Feedback extends Component {
    state = {
        open: false,
        feedbackList: [],

    };

    componentWillMount() {
        this.getFeedback();
    }

    getFeedback() {
        API.getFeedback()
            .then((output) => {
                if (output.status != 1) {
                    alert("No data in database");
                }
                else {
                    var  list= output.feedBackQuestions;
                    this.setState({feedbackList: list});

                }
                this.props.history.push("/Feedback");
                $(document).ready(
                    setTimeout(function () {
                        $('#dtMaterialDesignExample').DataTable();
                        $('#dtMaterialDesignExample_wrapper').find('label').each(function () {
                            $(this).parent().append($(this).children());
                        });
                        $('#dtMaterialDesignExample_wrapper .dataTables_filter').find('input').each(function () {
                            $('input').attr("placeholder", "Search");
                            $('input').removeClass('form-control-sm');
                        });
                        $('#dtMaterialDesignExample_wrapper .dataTables_length').addClass('d-flex flex-row');
                        $('#dtMaterialDesignExample_wrapper .dataTables_filter').addClass('md-form');
                        $('#dtMaterialDesignExample_wrapper select').removeClass(
                            'custom-select custom-select-sm form-control form-control-sm');
                        // $('#dtMaterialDesignExample_wrapper select').addClass('mdb-select');
                        // $('#dtMaterialDesignExample_wrapper .mdb-select').materialSelect();
                        $('#dtMaterialDesignExample_wrapper .dataTables_filter').find('label').remove();
                    },5000)
                );

            });

    }

    render() {
        const {open} = this.state;

        return (
            <div className="w3-container">
                <div className="row">
                    <div className="col-sm-4 col-md-4 col-lg-4"/>
                    <div className="col-sm-5 col-md-5 col-lg-5">
                        <h3 className="page-title">Feedback</h3>
                    </div>
                </div>
                <br/>


                <div className="row">
                    <div className="col-sm-2 col-md-2 col-lg-2"/>
                    <div className="col-sm-10 col-md-10 col-lg-10">
                         <table id="dtMaterialDesignExample"
                               className="table table-striped table-bordered table-sm stripe1" cellSpacing="0"
                               width="100%">
                            <thead>
                            <tr>
                                <th className="th-sm">Question</th>
                                <th className="th-sm">Answer</th>
                            </tr>
                            </thead>
                            <tbody>
                            {

                                this.state.feedbackList.map(r => {
                                    return (
                                        <tr key={Math.random()}>
                                            <td>{r.question}</td>
                                            <td>{r.answer}</td>

                                        </tr>
                                    )
                                })
                            }
                            </tbody>
                            <tfoot>
                            <tr>
                                <th className="th-sm">Question</th>
                                <th className="th-sm">Answer</th>
                            </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>

            </div>
        );
    }
}

export default withRouter(Feedback);