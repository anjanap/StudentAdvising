import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import NavigationBar from "./NavigationBar";
import ReactDOM from 'react-dom';
import * as API from '../api/API';
import './style.css';

class NewQuestion extends Component {

    state = {
        question: '',
        answer: '',
        category: '',
        appliesto: '',
        categoriesList: [],
        appliestoList: ['Current Student', 'Prospective Student', 'Both'],
        formValid: false,
        questionValid: false,
        answerValid: false,
        displayErrors: {question: '', answer: ''},
    };

    componentWillMount() {
      var r=[], rjson={};
      this.setState({rows:[]});
      API.getAllCategories()
      .then((output) => {
        if(output.status!=1)
          alert("No categories in database");
        var l=output.categoryNames;
        this.setState({categoriesList: l});
      });
     }

     componentWillMount() {
       var r=[], rjson={};
       this.setState({rows:[]});
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

    render() {
        return (
            <div className="w3-container">
              <div className="row">
              <div className="col-sm-4 col-md-4 col-lg-4" />
              <div className="col-sm-5 col-md-5 col-lg-5">
                <h2>Add a New Question</h2>
              </div>
              </div>

              <div className="row">
                <div className="col-sm-4 col-md-4 col-lg-4" />
                <div className="col-sm-5 col-md-5 col-lg-5">
                    <form>

                      <div className="row form-group">
                        <div className="col-sm-2 col-md-2 col-lg-2" />
                        <div className="col-sm-8 col-md-8 col-lg-8">
                          <textarea type="text" ref="ques" placeholder="question*" className="form-control" onChange={(event) => {
                              const name="question"
                              const value=event.target.value
                              this.setState({question: event.target.value,type:true}, () => {
                                this.validateData(name, value) }); }}/>
                        </div>
                      </div>

                      <div className="row form-group">
                        <div className="col-sm-2 col-md-2 col-lg-2" />
                        <div className="col-sm-8 col-md-8 col-lg-8">
                          <textarea type="text" ref="ans" placeholder="answer*" className="form-control" onChange={(event) => {
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
            </div>
        );
    }
}

export default NewQuestion;
