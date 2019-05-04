import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import * as API from '../api/API';
import Modal from 'react-responsive-modal';
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-dt';
import 'datatables.net-buttons';
import 'datatables.net-buttons-dt';
import {MDBBtn} from "mdbreact";
import '../css/style.css';
import Suggestions from "./Suggestions";

class Unanswered extends Component {

    state = {
        unansweredList: [],
        categoriesList: [],
        questiontitle:'',
        appliestoList: [],
        question: '',
        answer: '',
        category: '',
        appliesto: '',
        formValid: false,
        questionValid: true,
        answerValid: false,
        categoryValid: false,
        appliestoValid: false,
        displayErrors: {question: '', answer: ''},
        unansweredQuestion: '',
        unansweredQuestionId: '',
        questionDetails: [],
        open: false,
        display: true,
    };

    componentWillMount() {
        this.getUnansweredquestions();
        this.getAllCategories();
        this.getUserGroups();
    }

    getUnansweredquestions() {
        this.setState({unansweredList: []});
        API.getAllUnansweredQuestions()
            .then((output) => {
                if (output.status != 1)
                    alert("No data in database");
                else {
                    var qlist = output.unansweredQuestions;
                    this.setState({unansweredList: qlist});

                }
                this.props.history.push("/Unanswered");
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
                        $('#dtMaterialDesignExample_wrapper .dataTables_filter').find('label').remove();

                    },1000)
                );
            });

    }

    getAllCategories() {
        API.getAllCategories()
            .then((output) => {
                if (output.status != 1)
                    alert("No categories in database");
                else {
                    var l = output.categoryNames;
                    this.setState({categoriesList: l});
                }
            });
    }

    getUserGroups() {
        API.getAllAppliesTo()
            .then((output) => {
                if (output.status != 1)
                    alert("No categories in database");
                else {
                    var l = output.appliesTo;
                    this.setState({appliestoList: l});
                }
            });
    }

    addNew = (input) => {
        var payload = ({
            question: input.question,
            answer: input.answer,
            category: input.category,
            applyTo: input.appliesto
        });
        //alert(this.state.category);
        API.setQuestionAndAnswer(payload)
            .then((output) => {
                console.log("check: " + output);
                if (output.status === 1) {
                    this.setState({open: false});
                    var payloadDelete = ({questionId: this.state.unansweredQuestionId});
                    API.deleteUnansweredQuestion(payloadDelete)
                        .then((output) => {
                            if (output.status == 1) {
                                this.getUnansweredquestions();
                                alert("Successful added");
                            }
                        });
                } else if (output === -1) {
                    alert("Question already exist");
                }
            })
    }


    handleLinkQuestion = (question,input) => {
        var payload = ({
            question: question,
            answer: input.answer,
            category: input.category,
            applyTo: input.appliesTo
        });
        console.log(payload);
        this.changeDisplay();
    }

    getSuggestions = (input) => {
        this.setState({questionDetails: [], display: false});
        var payload = ({questionId: input.id});
        API.getAllMatchingQuestions(payload)
            .then((output) => {
                if (output.status != 1)
                    alert("No matching questions in database");
                else {
                    this.setState({questionDetails: output.questionAndAnswers, display: false, questiontitle: input.question});
                }
            });
    }

    onOpenModal = (data) => {
        console.log("edit: " + data.question);
        this.setState({
            question: '',
            answer: '',
            category: '',
            appliesto: '',
            formValid: false,
            questionValid: true,
            answerValid: false,
            categoryValid: false, appliestoValid: false});

        this.setState({
            question: data.question,
            unansweredQuestionId: data.id,
            open: true
        });
    };

    onCloseModal = () => {
        this.setState({open: false});
    };

    changeDisplay = () => {
        console.log("HERE");
        this.setState({display: true});
        this.getUnansweredquestions();
    }




    validateData(fieldName, value) {
        let fieldValidationErrors = this.state.displayErrors;
        let questionValid = this.state.questionValid;
        let answerValid = this.state.answerValid;
        let categoryValid = this.state.categoryValid;
        let appliestoValid = this.state.appliestoValid;
        switch (fieldName) {
            case 'question':
                questionValid = value.length >= 1;
                fieldValidationErrors.question = questionValid ? '' : ' is too short';
                break;
            case 'answer':
                answerValid = value.length >= 1;
                fieldValidationErrors.answer = answerValid ? '' : ' is too short';
                break;
            case 'category':
                categoryValid = value.length >= 1;
                fieldValidationErrors.answer = categoryValid ? '' : ' is required';
                break;
            case 'appliesto':
                appliestoValid = value.length >= 1;
                fieldValidationErrors.answer = appliestoValid ? '' : ' is required';
                break;
            default:
                break;
        }
        this.setState({
            displayErrors: fieldValidationErrors,
            questionValid: questionValid,
            answerValid: answerValid,
            categoryValid: categoryValid,
            appliestoValid: appliestoValid
        }, this.validateForm);
    }

    validateForm() {
        this.setState({formValid: this.state.questionValid && this.state.answerValid && this.state.categoryValid && this.state.appliestoValid});
    }


    render() {
        const {open} = this.state;
        return (
            <div className="w3-container">
                {
                    this.state.display === true ? (
                        <div>
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
                                           className="table table-striped table-bordered table-sm stripe1"
                                           cellSpacing="0"
                                           width="100%">

                                        <thead>
                                        <tr>
                                            <th className="th-sm">Question</th>
                                            <th className="th-sm">Add New Answer</th>
                                            <th className="th-sm">Suggestions</th>
                                        </tr>
                                        </thead>

                                        <tbody>
                                        {

                                            this.state.unansweredList.map(r => {
                                                return (
                                                    <tr key={r.id}>
                                                        <td style={{width: '50%'}}>{r.question}</td>
                                                        <td style={{width: '20%'}}><MDBBtn color="warning" className="glyphicon glyphicon-plus"
                                                                    size="sm"
                                                                    onClick={() => this.onOpenModal(r)}></MDBBtn></td>
                                                        <td style={{width: '20%'}}><MDBBtn color="info" size="sm"
                                                                    onClick={() => this.getSuggestions(r)}> View</MDBBtn>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                        </tbody>
                                        <tfoot>
                                        <tr>
                                            <th className="th-sm">Question</th>
                                            <th className="th-sm">Add Answer</th>
                                            <th className="th-sm">Suggestions</th>
                                        </tr>
                                        </tfoot>

                                    </table>
                                </div>
                            </div>


                            <Modal open={open} onClose={this.onCloseModal} center>
                                <div className="w3-container">
                                    <div className="row">
                                        <div className="col-sm-2 col-md-2 col-lg-2"/>
                                        <div className="col-sm-8 col-md-8 col-lg-8">
                                            <h3 className="page-title">Answer Question</h3>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <form>

                                            <div className="row form-group">
                                                <div className="col-sm-2 col-md-2 col-lg-2"/>
                                                <div className="col-sm-8 col-md-8 col-lg-8">
                    <textarea type="text" rows="4" ref="ques" placeholder="question*" className="form-control"
                              onChange={(event) => {
                                  const name = "question"
                                  const value = event.target.value
                                  this.setState({question: event.target.value, type: true}, () => {
                                      this.validateData(name, value)
                                  });
                              }} value={this.state.question}/>
                                                </div>
                                            </div>

                                            <div className="row form-group">
                                                <div className="col-sm-2 col-md-2 col-lg-2"/>
                                                <div className="col-sm-8 col-md-8 col-lg-8">
                    <textarea type="text" rows="6" ref="ans" placeholder="answer*" className="form-control"
                              onChange={(event) => {
                                  const name = "answer"
                                  const value = event.target.value
                                  this.setState({answer: event.target.value, type: true}, () => {
                                      this.validateData(name, value)
                                  });
                              }}/>
                                                </div>
                                            </div>

                                            <div className="row form-group">
                                                <div className="col-sm-2 col-md-2 col-lg-2"/>
                                                <div className="col-sm-8 col-md-8 col-lg-8">
                                                    <select ref="catg" className="form-control" onChange={(event) => {
                                                        const name = "category"
                                                        const value = event.target.value
                                                        this.setState({category: event.target.value, type: true}, () => {
                                                            this.validateData(name, value)
                                                        });}}
                                                            value={this.state.category}>
                                                        <option key="0" value="" defaultValue="selected"
                                                                disabled>Category*
                                                        </option>
                                                        {
                                                            this.state.categoriesList.map(c => {
                                                                return (
                                                                    <option key={Math.random()} value={c}>{c}</option>
                                                                )
                                                            })
                                                        }
                                                    </select>
                                                </div>
                                                <div className="col-sm-1 col-md-1 col-lg-1"
                                                     style={{marginLeft: '-23px'}}>
                                                    {/*<button type="button" className="btn btn-link btn-sm" style={{align: 'left'}} onClick={() => this.onOpenModal()}>Add New</button>*/}

                                                </div>
                                            </div>

                                            <div className="row form-group">
                                                <div className="col-sm-2 col-md-2 col-lg-2"/>
                                                <div className="col-sm-8 col-md-8 col-lg-8">
                                                    <select ref="app" className="form-control" onChange={(event) => {
                                                        const name = "appliesto"
                                                        const value = event.target.value
                                                        this.setState({appliesto: event.target.value, type: true}, () => {
                                                            this.validateData(name, value)
                                                        });
                                                    }} value={this.state.appliesto}>
                                                        <option key="0" value="" defaultValue="selected"
                                                                disabled>Students*
                                                        </option>
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
                                                    <button type="button" className="btn btn-primary home-btn"
                                                            disabled={!this.state.formValid} value="Submit"
                                                            onClick={(event) => this.addNew(this.state)}>Add
                                                    </button>
                                                </div>
                                            </div>

                                        </form>
                                    </div>
                                </div>
                            </Modal>
                        </div>
                    ) : (<Suggestions questionDetails={this.state.questionDetails}
                                      changeDisplay={() => this.changeDisplay()}
                                      linkQuestion={this.handleLinkQuestion} questiontitle={this.state.questiontitle}/>)
                }
            </div>
        );
    }
}

export default withRouter(Unanswered);