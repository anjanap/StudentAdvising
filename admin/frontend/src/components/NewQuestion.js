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
        categoriesList: []
    };

    validateData(fieldName, value) {

    }

    handleLogin = (input) =>{
    }

    render() {
        return (
            <div className="w3-container">
              <h2>Add a New Question</h2>

              <div className="row">
                <div className="col-sm-3 col-md-3 col-lg-3" />
                <div className="col-sm-5 col-md-5 col-lg-5">
                    <form>

                      <div className="row form-group">
                        <div className="col-sm-2 col-md-2 col-lg-2" />
                        <div className="col-sm-8 col-md-8 col-lg-8">
                          <textarea type="text" ref="ques" placeholder="question*" className="form-control"/>
                        </div>
                      </div>

                      <div className="row form-group">
                        <div className="col-sm-2 col-md-2 col-lg-2" />
                        <div className="col-sm-8 col-md-8 col-lg-8">
                          <textarea type="text" ref="ans" placeholder="answer*" className="form-control"/>
                        </div>
                      </div>

                      <div className="row form-group">
                        <div className="col-sm-2 col-md-2 col-lg-2" />
                        <div className="col-sm-8 col-md-8 col-lg-8">
                        <select ref="catg" className="form-control" onChange={this.validateData()} onChange={(event) => {this.setState({category: event.target.value});}}>
                            <option key="0" value="" selected="selected" disabled>Select</option>
                            {
                            this.state.categoriesList.map(c=>{
                              return(
                                <option key={Math.random()} value={c}>c</option>
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
                          <button type="button" className="btn btn-primary home-btn" disabled={!this.state.formValid}  value="Submit" onClick={(event) => this.handleLogin(this.state)}>Add</button>
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
