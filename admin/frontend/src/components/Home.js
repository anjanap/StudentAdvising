import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import NavigationBar from "./NavigationBar";
import ReactDOM from 'react-dom';
import * as API from '../api/API';

class Home extends Component {

    state = {
        username: '',
        password: '',
        validatedusername: '',
        message: '',
        formValid: false,
        formErrors: {email: '', password: ''},
        emailValid: false,
        passwordValid: false,
    };

  handleLogin = (input) =>{
      //this.setState({username: ReactDOM.findDOMNode(this.refs.user).value});
      var u=input.username;
      var p=input.password;
      var payload= ({username: u, password: p});
      console.log(p+" : "+u);
      API.signin(payload)
          .then((output) => {
            console.log(output);
              if (output === 1) {
              ReactDOM.findDOMNode(this.refs.user).value = "";
              ReactDOM.findDOMNode(this.refs.pwd).value = "";
              this.setState({validatedusername: this.state.username});
                this.props.history.push("/");

              } else {
                ReactDOM.findDOMNode(this.refs.user).value = "";
                ReactDOM.findDOMNode(this.refs.pwd).value = "";
                this.setState({islogged: 'false', message:'',formValid:false});
                alert("Invalid credentials. Login again.");
              }

    })
  }


    //
    // handleLogout = () => {
    //   this.setState({username: ''});
    //   this.props.history.push("/home");
    //   }
    //
    // handleLogin(){
    //   this.setState({username: ReactDOM.findDOMNode(this.refs.user).value});
    //   this.props.history.push("/");
    // }
    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let emailValid = this.state.emailValid;
        let passwordValid = this.state.passwordValid;
        switch(fieldName) {
            case 'email':
                emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                fieldValidationErrors.email = emailValid ? '' : ' is invalid';
                break;
            case 'password':
                passwordValid = value.length >= 3;
                fieldValidationErrors.password = passwordValid ? '': ' is too short';
                break;
            default:
                break;
        }
        this.setState({formErrors: fieldValidationErrors,
            emailValid: emailValid,
            passwordValid: passwordValid,
        }, this.validateForm);
    }

    validateForm() {
        this.setState({formValid: this.state.emailValid && this.state.passwordValid});
    }


    render() {
        return (
            <div>
            {
              this.state.validatedusername!=='' ? (
              <div className="w3-container">
              <div className="col-sm-12 col-md-12 col-lg-12"><br/></div>
              <div className="row">
                <NavigationBar user={this.state.username} logout={()=>this.handleLogout()}/>
              </div>
            </div>) :
              (<div className="w3-container">
              <h2>Advisor Dashboard</h2>
              <hr/><br/>
                <form>
                <div className="row">
                  <div className="col-sm-2 col-md-2 col-lg-2">
                    <label style={{fontSize:'16px'}}>Username </label>
                  </div>
                  <div className="col-sm-8 col-md-8 col-lg-8">
                    <input type="text" ref="user" className="form-control" onChange={(event) => {
                        const name="email"
                        const value=event.target.value
                        this.setState({
                            username: event.target.value,
                            type:true
                        }, () => { this.validateField(name, value) });
                    }}/>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-2 col-md-2 col-lg-2">
                    <label style={{fontSize:'16px'}}>Password </label>
                  </div>
                  <div className="col-sm-8 col-md-8 col-lg-8">
                  <input type="password" ref="pwd" className="form-control" onChange={(event) => {
                      const name="password"
                      const value=event.target.value
                      this.setState({
                          password: event.target.value,
                          type:true
                      }, () => { this.validateField(name, value) });
                  }}/>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-12 col-md-12 col-lg-12"><br/></div>
                  <div className="col-sm-2 col-md-2 col-lg-2"></div>
                  <div className="col-sm-8 col-md-8 col-lg-8">
                  <button type="button" className="btn btn-success" disabled={!this.state.formValid}  value="Submit" onClick={(event) => this.handleLogin(this.state)}>Submit</button>
                  </div>
                </div>
                </form>
                </div>
              )
            }
            </div>
        );
    }
}

export default withRouter(Home);
