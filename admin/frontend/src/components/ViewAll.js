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


class ViewAll extends Component {
    state = {
        questionList: [],
        open: false,
        categoriesList: [],
        appliestoList: ['Current Student', 'Prospective Student', 'Both'],
        editQuestion: '',
        editAnswer: '',
        editQuestionId: '',
        editAnswerId: '',
        editCategory: '',
        editApplyTo: '',
        editData: {}
    };

    onOpenModal = (data) => {
        console.log("edit: " + data.question);
        this.setState({
            editQuestion: data.question,
            editAnswer: data.answer,
            editCategory: data.category,
            editApplyTo: data.applyTo,
            editQuestionId: data.questionId,
            editAnswerId: data.answerId,
            open: true
        });
    };

    onCloseModal = () => {
        this.setState({open: false});
    };

    componentWillMount() {
        this.getAllquestions();
        API.getAllCategories()
            .then((output) => {
                if (output.status != 1)
                    alert("No categories in database");
                else {
                    var l = output.categoryNames;
                    this.setState({categoriesList: l});
                    this.props.history.push("/ViewAll");
                }
            });
    }

    getAllquestions() {
        this.setState({questionList: []});
        API.getAllQuestions()
            .then((output) => {
                if (output.status != 1) {
                    alert("No data in database");
                }
                else {
                    var qnalist = output.questionAndAnswers;
                    this.setState({questionList: qnalist});
                }

                $(document).ready(
                    function () {
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
                    }
                );

            });

    }

    handleEdit = (input) => {
        var payload = ({
            question: input.editQuestion,
            answer: input.editAnswer,
            category: input.editCategory,
            applyTo: input.editApplyTo,
            questionId: input.editQuestionId,
            answerId: input.editAnswerId,
        });

        API.editQuestionAndAnswer(payload)
            .then((output) => {
                console.log("check: " + output.status);
                if (output.status === 1) {
                    alert("Edit successful");
                    this.getAllquestions();
                    this.setState({open: false});
                } else {
                    alert("Unable to edit");
                    this.setState({open: false});
                }
            })
    }

    handleDelete = (delQuestionId, delAnswerId) => {
        var payload = ({questionId: delQuestionId, answerId: delAnswerId});
        API.deleteQuestionAndAnswer(payload)
            .then((output) => {
                if (output.status === 1) {
                    alert("Delete successful");
                    this.getAllquestions();
                }
            })
    }

    render() {
        const {open} = this.state;

        return (
            <div className="w3-container">
                <div className="row">
                    <div className="col-sm-4 col-md-4 col-lg-4"/>
                    <div className="col-sm-5 col-md-5 col-lg-5">
                        <h3 className="page-title">Database</h3>
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
                                <th className="th-sm">Category</th>
                                <th className="th-sm">Applies To</th>
                                <th className="th-sm">Edit</th>
                                <th className="th-sm">Delete</th>
                            </tr>
                            </thead>
                            <tbody>
                            {

                                this.state.questionList.map(r => {
                                    return (
                                        <tr key={r.questionId}>
                                            <td>{r.question}</td>
                                            <td>{r.answer}</td>
                                            <td>{r.category}</td>
                                            <td>{r.applyTo}</td>
                                            <td><MDBBtn color="warning" className="glyphicon glyphicon-pencil" size="sm"
                                                        onClick={() => this.onOpenModal(r)}></MDBBtn></td>
                                            <td><MDBBtn color="danger" className="glyphicon glyphicon-trash" size="sm"
                                                        onClick={() => this.handleDelete(r.questionId, r.answerId)}></MDBBtn>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                            </tbody>
                            <tfoot>
                            <tr>
                                <th className="th-sm">Question</th>
                                <th className="th-sm">Answer</th>
                                <th className="th-sm">Category</th>
                                <th className="th-sm">Applies To</th>
                                <th className="th-sm">Edit</th>
                                <th className="th-sm">Delete</th>
                            </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>

                <Modal open={open} onClose={this.onCloseModal} center >
                    <div className="w3-container">
                        <div className="row">
                            <div className="col-sm-4 col-md-4 col-lg-4"/>
                            <div className="col-sm-8 col-md-8 col-lg-8">
                                <h3 className="page-title">Edit</h3>
                            </div>
                        </div>

                        <div className="row">
                            <form>
                                <div className="row form-group">
                                    <div className="col-sm-1 col-md-1 col-lg-1"/>
                                    <div className="col-sm-2 col-md-2 col-lg-2">
                                        <label>Question</label>
                                    </div>
                                    <div className="col-sm-8 col-md-8 col-lg-8">
                            <textarea type="text" rows="4" ref="ques" placeholder="question*" className="form-control"
                                      onChange={(event) => {
                                          this.setState({editQuestion: event.target.value});
                                      }} value={this.state.editQuestion}/>
                                    </div>
                                </div>
                                <div className="row form-group">
                                    <div className="col-sm-1 col-md-1 col-lg-1"/>
                                    <div className="col-sm-2 col-md-2 col-lg-2">
                                        <label>Answer</label>
                                    </div>
                                    <div className="col-sm-8 col-md-8 col-lg-8">
                            <textarea type="text" rows="6" ref="ans" placeholder="answer*" className="form-control"
                                      onChange={(event) => {
                                          this.setState({editAnswer: event.target.value});
                                      }} value={this.state.editAnswer}/>
                                    </div>
                                </div>
                                <div className="row form-group">
                                    <div className="col-sm-1 col-md-1 col-lg-1"/>
                                    <div className="col-sm-2 col-md-2 col-lg-2">
                                        <label>Category</label>
                                    </div>
                                    <div className="col-sm-8 col-md-8 col-lg-8">
                                        <select ref="catg" className="form-control" onChange={(event) => {
                                            this.setState({editCategory: event.target.value});
                                        }} value={this.state.editCategory}>
                                            <option key="0" value="" defaultValue="selected" disabled>Category*</option>
                                            {
                                                this.state.categoriesList.map(c => {
                                                    return (
                                                        <option key={Math.random()} value={c}>{c}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                </div>
                                <div className="row form-group">
                                    <div className="col-sm-1 col-md-1 col-lg-1"/>
                                    <div className="col-sm-2 col-md-2 col-lg-2">
                                        <label>Student</label>
                                    </div>
                                    <div className="col-sm-8 col-md-8 col-lg-8">
                                        <select ref="app" className="form-control" onChange={(event) => {
                                            this.setState({editApplyTo: event.target.value});
                                        }} value={this.state.editApplyTo}>
                                            <option key="0" value="" defaultValue="selected" disabled>Students*</option>
                                            {
                                                this.state.appliestoList.map(a => {
                                                    return (
                                                        <option key={Math.random()} value={a}>{a}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                </div>
                                <div className="row form-group">
                                    <div className="col-sm-12 col-md-12 col-lg-12"><br/></div>
                                    <div className="col-sm-2 col-md-2 col-lg-2"/>
                                    <div className="col-sm-8 col-md-8 col-lg-8">
                                        <button type="button" className="btn btn-primary home-btn" value="Submit"
                                                onClick={(event) => this.handleEdit(this.state)}>Edit
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </Modal>
            </div>
        );
    }
}

export default withRouter(ViewAll);