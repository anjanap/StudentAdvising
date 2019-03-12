import React, {Component} from 'react';
import * as API from '../api/API';
import Modal from 'react-responsive-modal';
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-dt';
import 'datatables.net-buttons';
import 'datatables.net-buttons-dt';
import {MDBBtn} from "mdbreact";
import ReactDOM from "react-dom";
import '../css/style.css';

class Unanswered extends Component {

    state = {
        unansweredList: [{question: "anjana"}],
        categoriesList: [],
        appliestoList: ['Current Student', 'Prospective Student', 'Both']
    };

    componentWillMount() {
        this.getUnansweredquestions();
        API.getAllCategories()
            .then((output) => {
                if (output.status != 1)
                    alert("No categories in database");
                var l = output.categoryNames;
                this.setState({categoriesList: l});
            });
    }

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

    getUnansweredquestions() {
        //this.setState({unansweredList: []});
        // API.getAllQuestions()
        //     .then((output) => {
        //         if (output.status != 1)
        //             alert("No data in database");
        //         var qnalist = output.questionAndAnswers;
        //         this.setState({unansweredList: qnalist});
        //
        //         $(document).ready(
        //             function () {
        //                 $('#dtMaterialDesignExample').DataTable();
        //                 $('#dtMaterialDesignExample_wrapper').find('label').each(function () {
        //                     $(this).parent().append($(this).children());
        //                 });
        //                 $('#dtMaterialDesignExample_wrapper .dataTables_filter').find('input').each(function () {
        //                     $('input').attr("placeholder", "Search");
        //                     $('input').removeClass('form-control-sm');
        //                 });
        //                 $('#dtMaterialDesignExample_wrapper .dataTables_length').addClass('d-flex flex-row');
        //                 $('#dtMaterialDesignExample_wrapper .dataTables_filter').addClass('md-form');
        //                 $('#dtMaterialDesignExample_wrapper select').removeClass(
        //                     'custom-select custom-select-sm form-control form-control-sm');
        //                 $('#dtMaterialDesignExample_wrapper .dataTables_filter').find('label').remove();
        //             }
        //         );
        //     });
    }

    handleAdd = (input) =>{
        // var payload= ({question: input.question, answer: input.answer, category: input.category, applyTo: input.appliesto});
        // //alert(this.state.category);
        // API.setQuestionAndAnswer(payload)
        //     .then((output) => {
        //         console.log("check: "+output);
        //         if (output.status === 1) {
        //             ReactDOM.findDOMNode(this.refs.ques).value = "";
        //             ReactDOM.findDOMNode(this.refs.ans).value = "";
        //             ReactDOM.findDOMNode(this.refs.catg).value = "";
        //             ReactDOM.findDOMNode(this.refs.app).value = "";
        //             alert("Successful added");
        //         }
        //         else if (output === -1){
        //             alert("Question already exist");
        //         }
        //     })
    }

    render() {
        const {open} = this.state;
        return (
            <div className="w3-container">
                <div className="row">
                    <div className="col-sm-4 col-md-4 col-lg-4"/>
                    <div className="col-sm-5 col-md-5 col-lg-5">
                        <h3 className="page-title">Unanswered Questions</h3>
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
                                <th className="th-sm">Add Answer</th>
                            </tr>
                            </thead>
                            <tbody>
                            {

                                this.state.unansweredList.map(r => {
                                    return (
                                        <tr key={Math.random()}>
                                            <td>{r.question}</td>
                                            <td><MDBBtn color="warning" className="glyphicon glyphicon-plus" size="sm"
                                                        onClick={() => this.onOpenModal(r)}></MDBBtn></td>
                                        </tr>
                                    )
                                })
                            }
                            </tbody>
                            <tfoot>
                            <tr>
                                <th className="th-sm">Question</th>
                                <th className="th-sm">Add Answer</th>
                            </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>


                <Modal open={open} onClose={this.onCloseModal} center>
                    <div className="w3-container">
                        <div className="row">
                            <div className="col-sm-4 col-md-4 col-lg-4"/>
                            <div className="col-sm-8 col-md-8 col-lg-8">
                                <h3 className="page-title">Add</h3>
                            </div>
                        </div>

                        <div className="row">
                            <form>

                                <div className="row form-group">
                                    <div className="col-sm-2 col-md-2 col-lg-2"/>
                                    <div className="col-sm-8 col-md-8 col-lg-8">
                                    <textarea type="text" rows="6" ref="ans" placeholder="answer*" className="form-control"/>
                                    </div>
                                </div>
                                <div className="row form-group">
                                    <div className="col-sm-2 col-md-2 col-lg-2"/>
                                    <div className="col-sm-8 col-md-8 col-lg-8">
                                        <select ref="catg" className="form-control" onChange={(event) => {this.setState({category: event.target.value});}} value={this.state.category}>
                                            <option key="0" value="" selected="selected" disabled>Category*</option>
                                            {
                                                this.state.categoriesList.map(c=>{
                                                    return(
                                                        <option key={Math.random()} value={c}>{c}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                </div>
                                <div className="row form-group">
                                    <div className="col-sm-2 col-md-2 col-lg-2"/>
                                    <div className="col-sm-8 col-md-8 col-lg-8">
                                        <select ref="app" className="form-control" onChange={(event) => {this.setState({appliesto: event.target.value});}} value={this.state.appliesto}>
                                            <option key="0" value="" selected="selected" disabled>Students*</option>
                                            {
                                                this.state.appliestoList.map(a=>{
                                                    return(
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
                                                onClick={(event) => this.handleAdd(this.state)}>Add
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

export default Unanswered;
