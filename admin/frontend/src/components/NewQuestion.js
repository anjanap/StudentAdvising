import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import ReactDOM from 'react-dom';
import Modal from 'react-responsive-modal';
import * as API from '../api/API';
import '../css/style.css';

class NewQuestion extends Component {

    state = {
        question: '',
        answer: '',
        category: '',
        appliesto: '',
        categoriesList: [],
        newcategory: '',
        newusergroup:'',
        appliestoList: [],
        formValid: false,
        questionValid: false,
        answerValid: false,
        categoryValid: false,
        appliestoValid: false,
        displayErrors: {question: '', answer: ''},
        open: false,
        open1: false
    };

    onOpenModal = () => {
        this.setState({
            open: true
        });
    };

    onCloseModal = () => {
        this.setState({open: false});
    };

    onOpenModal1 = () => {
        this.setState({
            open1: true
        });
    };

    onCloseModal1 = () => {
        this.setState({open1: false});
    };

    componentWillMount() {
        this.props.history.push("/NewQuestion");
        this.setState({rows: []});
        this.getAllCategories();
        this.getUserGroups();
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
                    alert("No applies to field in database");
                else {
                    var l = output.appliesTo;
                    this.setState({appliestoList: l});
                }
            });
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

    addNew = (input) => {
        var payload = ({
            question: input.question,
            answer: input.answer,
            category: input.category,
            applyTo: input.appliesto
        });
        API.setQuestionAndAnswer(payload)
            .then((output) => {
                if (output.status === 1) {
                    ReactDOM.findDOMNode(this.refs.ques).value = "";
                    ReactDOM.findDOMNode(this.refs.ans).value = "";
                    ReactDOM.findDOMNode(this.refs.catg).value = "";
                    ReactDOM.findDOMNode(this.refs.app).value = "";
                    this.setState({
                        question: '',
                        answer: '',
                        category: '',
                        appliesto: '',
                        formValid: false,
                        questionValid: false,
                        answerValid: false,
                        categoryValid: false, appliestoValid: false});
                    alert("Successful added");
                } else if (output.status === -1) {
                    alert("Question already exist");
                }
                else
                    alert("Question error");
            })
    }

    addNewCategory = (input) => {
        var payload = ({category: input.newcategory});
        API.setCategory(payload)
            .then((output) => {
                if (output.status === 1) {
                    ReactDOM.findDOMNode(this.refs.newcategory).value = "";
                    this.getAllCategories();
                    this.setState({open: false});
                    alert("Successfully added");
                } else if (output === -1) {
                    alert("Category already exist");
                }
            })
    }

    addNewUserGroup = (input) => {
        var payload = ({appliesTo: input.newusergroup});
        //alert(this.state.category);
        API.setAppliesTo(payload)
            .then((output) => {
                if (output.status === 1) {
                    ReactDOM.findDOMNode(this.refs.newusergroup).value = "";
                    this.getUserGroups();
                    this.setState({open1: false});
                    alert("Successfully added");
                } else if (output === -1) {
                    alert("Group already exist");
                }
            })
    }

    render() {
        const {open} = this.state;
        const {open1} = this.state;
        return (
            <div className="w3-container">
                <div className="row">
                    <div className="col-sm-4 col-md-4 col-lg-4"/>
                    <div className="col-sm-5 col-md-5 col-lg-5">
                        <h3 className="page-title">Add a New Question</h3>
                    </div>
                </div>
                <br/>

                <div className="row">
                    <div className="col-sm-3 col-md-3 col-lg-3"/>
                    <div className="col-sm-7 col-md-7 col-lg-7">
                        <form>

                            <div className="row form-group">
                                <div className="col-sm-2 col-md-2 col-lg-2"/>
                                <div className="col-sm-8 col-md-8 col-lg-8">
                          <textarea type="text" rows="5" ref="ques" placeholder="question*" className="form-control"
                                    onChange={(event) => {
                                        const name = "question"
                                        const value = event.target.value
                                        this.setState({question: event.target.value, type: true}, () => {
                                            this.validateData(name, value)
                                        });
                                    }}/>
                                </div>
                            </div>

                            <div className="row form-group">
                                <div className="col-sm-2 col-md-2 col-lg-2"/>
                                <div className="col-sm-8 col-md-8 col-lg-8">
                          <textarea type="text" rows="7" ref="ans" placeholder="answer*" className="form-control"
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
                                    <select ref="catg" className="form-control"
                                            onChange={(event) => {
                                                const name = "category"
                                                const value = event.target.value
                                                this.setState({category: event.target.value, type: true}, () => {
                                                    this.validateData(name, value)
                                                });
                                            }}
                                            value={this.state.category}>
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
                                <div className="col-sm-1 col-md-1 col-lg-1">
                                    <button type="button" className="btn btn-link btn-sm" style={{align: 'left'}}
                                            onClick={() => this.onOpenModal()}>Add New
                                    </button>

                                </div>
                            </div>

                            <div className="row form-group">
                                <div className="col-sm-2 col-md-2 col-lg-2"/>
                                <div className="col-sm-8 col-md-8 col-lg-8">
                                    <select ref="app" className="form-control"
                                            onChange={(event) => {
                                                const name = "appliesto"
                                                const value = event.target.value
                                                this.setState({appliesto: event.target.value, type: true}, () => {
                                                    this.validateData(name, value)
                                                });
                                            }}
                                            value={this.state.appliesto}>
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
                                <div className="col-sm-1 col-md-1 col-lg-1">
                                    <button type="button" className="btn btn-link btn-sm" style={{align: 'left'}}
                                            onClick={() => this.onOpenModal1()}>Add New
                                    </button>

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


                <Modal open={open} onClose={this.onCloseModal} center>
                    <div className="w3-container">
                        <div className="row">
                            <div className="col-sm-2 col-md-2 col-lg-2"/>
                            <div className="col-sm-10 col-md-10 col-lg-10">
                                <h3 className="page-title">New Category</h3>
                            </div>
                        </div>
                        <br/>
                        <div className="row">
                            <form>

                                <div className="row form-group">
                                    <div className="col-sm-12 col-md-12 col-lg-12"><br/></div>
                                    <div className="col-sm-2 col-md-2 col-lg-2"/>
                                    <div className="col-sm-8 col-md-8 col-lg-8">
                                        <input type="text" ref="newcategory" placeholder="category name*"
                                               className="form-control" onChange={(event) => {
                                            this.setState({newcategory: event.target.value})
                                        }}/>
                                    </div>
                                </div>

                                <div className="row form-group">
                                    <div className="col-sm-12 col-md-12 col-lg-12"><br/></div>
                                    <div className="col-sm-2 col-md-2 col-lg-2"/>
                                    <div className="col-sm-8 col-md-8 col-lg-8">
                                        <button type="button" className="btn btn-primary home-btn" value="Submit"
                                                onClick={(event) => this.addNewCategory(this.state)}>Add
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </Modal>



                <Modal open={open1} onClose={this.onCloseModal1} center>
                    <div className="w3-container">
                        <div className="row">
                            <div className="col-sm-2 col-md-2 col-lg-2"/>
                            <div className="col-sm-10 col-md-10 col-lg-10">
                                <h3 className="page-title">New User Group</h3>
                            </div>
                        </div>
                        <br/>
                        <div className="row">
                            <form>
                                <div className="row form-group">
                                    <div className="col-sm-12 col-md-12 col-lg-12"><br/></div>
                                    <div className="col-sm-2 col-md-2 col-lg-2"/>
                                    <div className="col-sm-8 col-md-8 col-lg-8">
                                        <input type="text" ref="newusergroup" placeholder="user group name*"
                                               className="form-control" onChange={(event) => {
                                            this.setState({newusergroup: event.target.value})
                                        }}/>
                                    </div>
                                </div>

                                <div className="row form-group">
                                    <div className="col-sm-12 col-md-12 col-lg-12"><br/></div>
                                    <div className="col-sm-2 col-md-2 col-lg-2"/>
                                    <div className="col-sm-8 col-md-8 col-lg-8">
                                        <button type="button" className="btn btn-primary home-btn" value="Submit"
                                                onClick={(event) => this.addNewUserGroup(this.state)}>Add
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

export default withRouter(NewQuestion);