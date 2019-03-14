import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import NavigationBar from "./NavigationBar";
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
        newcategory:'',
        appliestoList: ['Current Student', 'Prospective Student', 'Both'],
        formValid: false,
        questionValid: false,
        answerValid: false,
        displayErrors: {question: '', answer: ''},
        open: false
    };

    onOpenModal = () => {
        this.setState({
            open: true
        });
    };

    onCloseModal = () => {
        this.setState({open: false});
    };

    handleNewCategory = (input) => {

    }

    // componentWillMount() {
    //   var r=[], rjson={};
    //   this.setState({rows:[]});
    //   API.getAllCategories()
    //   .then((output) => {
    //     if(output.status!=1)
    //       alert("No categories in database");
    //     var l=output.categoryNames;
    //     this.setState({categoriesList: l});
    //   });
    //  }

     componentWillMount() {
       var r=[], rjson={};
       this.setState({rows:[]});
       this.getAllCategories();
      }

     getAllCategories(){
         API.getAllCategories()
             .then((output) => {
                 if(output.status!=1)
                     alert("No categories in database");
                 var l=output.categoryNames;
                 this.setState({categoriesList: l});
             });
     }

    validateData(fieldName, value) {
      let fieldValidationErrors = this.state.displayErrors;
      let questionValid = this.state.questionValid;
      let answerValid = this.state.answerValid;
      switch(fieldName) {
        case 'question':
              questionValid = value.length >= 1;
              fieldValidationErrors.question = questionValid ? '': ' is too short';
              break;
        case 'answer':
              answerValid = value.length >= 1;
              fieldValidationErrors.answer = answerValid ? '': ' is too short';
              break;
        default:
              break;
      }
      this.setState({displayErrors: fieldValidationErrors, questionValid: questionValid,answerValid: answerValid}, this.validateForm);
    }

    validateForm() {
      this.setState({formValid: this.state.questionValid && this.state.answerValid});
    }

    addNew = (input) =>{
      var payload= ({question: input.question, answer: input.answer, category: input.category, applyTo: input.appliesto});
      //alert(this.state.category);
      API.setQuestionAndAnswer(payload)
          .then((output) => {
            console.log("check: "+output);
              if (output.status === 1) {
              ReactDOM.findDOMNode(this.refs.ques).value = "";
              ReactDOM.findDOMNode(this.refs.ans).value = "";
              ReactDOM.findDOMNode(this.refs.catg).value = "";
              ReactDOM.findDOMNode(this.refs.app).value = "";
              alert("Successful added");
            }
            else if (output === -1){
                alert("Question already exist");
            }
          })
    }

    addNewCategory = (input) =>{
        var payload= ({category: input.newcategory});
        //alert(this.state.category);
        API.setCategory(payload)
            .then((output) => {
                if (output.status === 1) {
                    ReactDOM.findDOMNode(this.refs.newcategory).value = "";
                    this.getAllCategories();
                    this.setState({open: false});
                    alert("Successfully added");
                }
                else if (output === -1){
                    alert("Category already exist");
                }
            })
    }

    render() {
        const {open} = this.state;
        return (
            <div className="w3-container">
              <div className="row">
              <div className="col-sm-4 col-md-4 col-lg-4" />
              <div className="col-sm-5 col-md-5 col-lg-5">
                <h3 className="page-title">Add a New Question</h3>
              </div>
              </div>
                <br/>

              <div className="row">
                <div className="col-sm-4 col-md-4 col-lg-4" />
                <div className="col-sm-5 col-md-5 col-lg-5">
                    <form>

                      <div className="row form-group">
                        <div className="col-sm-2 col-md-2 col-lg-2" />
                        <div className="col-sm-8 col-md-8 col-lg-8">
                          <textarea type="text" rows="4" ref="ques" placeholder="question*" className="form-control" onChange={(event) => {
                              const name="question"
                              const value=event.target.value
                              this.setState({question: event.target.value,type:true}, () => {
                                this.validateData(name, value) }); }}/>
                        </div>
                      </div>

                      <div className="row form-group">
                        <div className="col-sm-2 col-md-2 col-lg-2" />
                        <div className="col-sm-8 col-md-8 col-lg-8">
                          <textarea type="text" rows="6" ref="ans" placeholder="answer*" className="form-control" onChange={(event) => {
                              const name="answer"
                              const value=event.target.value
                              this.setState({answer: event.target.value,type:true}, () => {
                                this.validateData(name, value) }); }}/>
                        </div>
                      </div>

                      <div className="row form-group">
                        <div className="col-sm-2 col-md-2 col-lg-2" />
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
                            <div className="col-sm-1 col-md-1 col-lg-1">
                            <button type="button" className="btn btn-link btn-sm" style={{align: 'left'}} onClick={() => this.onOpenModal()}>Add New</button>

                        </div>
                      </div>

                      <div className="row form-group">
                        <div className="col-sm-2 col-md-2 col-lg-2" />
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
                          <button type="button" className="btn btn-primary home-btn" disabled={!this.state.formValid}  value="Submit" onClick={(event) => this.addNew(this.state)}>Add</button>
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

                        <div className="row">
                            <form>

                                <div className="row form-group">
                                    <div className="col-sm-12 col-md-12 col-lg-12"><br/></div>
                                    <div className="col-sm-2 col-md-2 col-lg-2"/>
                                    <div className="col-sm-8 col-md-8 col-lg-8">
                                        <input type="text" ref="newcategory" placeholder="category name*" className="form-control" onChange={(event) => {
                                            this.setState({newcategory: event.target.value})}}/>
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

            </div>
        );
    }
}

export default NewQuestion;
