import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import NavigationBar from "./NavigationBar";
import ReactDOM from 'react-dom';
import * as API from '../api/API';
import '../css/style.css';
import DisplayErrors from "./DisplayErrors";


class Home extends Component {

    state = {
        username: '',
        password: '',
        firstname: '',
        lastname: '',
        phone: '',
        countrycode: '+1',
        validateuser: '',
        isadmin: -1,
        islogged: false,
        message: '',
        formValid: false,
        displayErrors: {email: '', password: ''},
        emailValid: false,
        passwordValid: false,
        formValid2: false,
        displayErrors2: {email: '', password: '', firstname: '', lastname: '', countrycode: '', phone: ''},
        emailValid2: false,
        passwordValid2: false,
        fnameValid2: false,
        lnameValid2: false,
        codeValid2: true,
        phoneValid2: false
    };



    componentWillMount() {
        API.checkCredentials()
            .then((output) => {
                if(output.status === 1){
                    //this.setState({islogged: true, validateuser: output.firstName});
                    console.log("sessions check: "+output.firstName);
                    this.logged(output.firstName+' '+output.lastName, output.isAdmin);
                    this.props.history.push("/home");
                }
                else {
                    console.log('logout called error');
                }
            });
    }

  handleLogin = (input) =>{
      var u=input.username;
      var p=input.password;
      var payload= ({emailAddress: u, password: p});
      console.log(p+" : "+u);
      API.signin(payload)
          .then((output) => {
            console.log(output);
              if (output.status >= 1) {
              ReactDOM.findDOMNode(this.refs.user).value = "";
              ReactDOM.findDOMNode(this.refs.pwd).value = "";
              this.props.history.push("/");
              console.log("admin : "+output.isAdmin);
              this.setState({validateuser: (output.firstName+' '+output.lastName), isadmin: output.isAdmin,islogged: true});

              } else if(output.status == -1){
                ReactDOM.findDOMNode(this.refs.user).value = "";
                ReactDOM.findDOMNode(this.refs.pwd).value = "";
                this.setState({islogged: false, message:'',formValid:false});
                alert(output.message);
              }
    })
  }

  handleLogout = () => {
      API.signOut()
          .then((status) => {
              if(status === 201){
                  this.setState({islogged: false, validateuser: ''});
                  this.props.history.push("/home");
              }
              else {
                  console.log('logout called error');
              }
          });

  }

  logged = (name,admin) => {
      this.setState({islogged:true,validateuser:name, isadmin:admin});
  };

  isNotlogged=()=>{
        this.setState({islogged:false,validateuser:''});
  }

  handleRegister = (input) =>{
    var payload= ({firstName: input.firstname, lastName: input.lastname, emailAddress: input.username, password: input.password, countryCode: input.countrycode, phoneNumber: input.phone});
    API.signup(payload)
        .then((output) => {
          //console.log("check: "+output);
            if (output === 1) {
            ReactDOM.findDOMNode(this.refs.usersignup).value = "";
            ReactDOM.findDOMNode(this.refs.pwdsignup).value = "";
            ReactDOM.findDOMNode(this.refs.fname).value = "";
            ReactDOM.findDOMNode(this.refs.lname).value = "";
            ReactDOM.findDOMNode(this.refs.ph).value = "";
            ReactDOM.findDOMNode(this.refs.code).value = "";
            alert("Successful");
          }
          else if (output === -1){
              alert("User exists. Try again.");
            }
        })
  }

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.displayErrors;
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;
    switch(fieldName) {
      case 'email':
            emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
            fieldValidationErrors.email = emailValid ? '' : ' is invalid';
            break;
      case 'password':
            passwordValid = value.length >= 1;
            fieldValidationErrors.password = passwordValid ? '': ' is too short';
            break;
      default:
            break;
    }
    this.setState({displayErrors: fieldValidationErrors, emailValid: emailValid,
            passwordValid: passwordValid,}, this.validateForm);
    }

    validateForm() {
        this.setState({formValid: this.state.emailValid && this.state.passwordValid});
    }

    validateField2(fieldName, value) {
      let fieldValidationErrors = this.state.displayErrors2;
      let emailValid = this.state.emailValid2;
      let passwordValid = this.state.passwordValid2;
      let fnameValid = this.state.fnameValid2;
      let lnameValid = this.state.lnameValid2;
      let codeValid = this.state.codeValid2;
      let phoneValid = this.state.phoneValid2;
      switch(fieldName) {
        case 'email':
              emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
              fieldValidationErrors.email = emailValid ? '' : ' is invalid';
              break;
        case 'password':
              passwordValid = value.length >= 1;
              fieldValidationErrors.password = passwordValid ? '': ' is too short';
              break;
        case 'fname':
              fnameValid = value.length >= 1;
              fieldValidationErrors.firstname = fnameValid ? '' : ' is invalid';
              break;
        case 'lname':
              lnameValid = value.length >= 1;
              fieldValidationErrors.lastname = lnameValid ? '' : ' is invalid';
              break;
        case 'countrycode':
              codeValid = value.length !== 0 && value.match(/^(\+?\d{1,3}|\d{1,4})$/);
              fieldValidationErrors.code = codeValid ? '' : ' is invalid';
              break;
        case 'phone':
              phoneValid = value.length !== 0 && value.length ===10 && value.match('^[0-9]+$');
              fieldValidationErrors.phone = phoneValid ? '': ' is invalid';
              break;
        default:
              break;
      }
      this.setState({displayErrors2: fieldValidationErrors, emailValid2: emailValid, passwordValid2: passwordValid,
        fnameValid2: fnameValid,lnameValid2: lnameValid, codeValid2: codeValid, phoneValid2: phoneValid}, this.validateForm2);
      }

      validateForm2() {
          this.setState({formValid2: this.state.emailValid2 && this.state.passwordValid2 && this.state.fnameValid2 && this.state.lnameValid2
                          && this.state.codeValid2 && this.state.phoneValid2});
      }


    render() {
        return (
            <div>
            {
              this.state.validateuser!=='' ? (
              <div className="w3-container">
              <div className="col-sm-12 col-md-12 col-lg-12"><br/></div>
              <div className="row">
                <NavigationBar user={this.state.validateuser} isadmin={this.state.isadmin} logout={()=>this.handleLogout()} handleLogged={this.logged} handleNotLogged={this.isNotlogged}/>
              </div>
            </div>) :
              (<div className="">
              <h2 className="home-h1">Advisor Dashboard</h2>
              <hr/><br/>


              <div className="row">
              <div className="col-sm-1 col-md-1 col-lg-1" />
              <div className="col-sm-5 col-md-5 col-lg-5" >
              <div className="login-form">
                <form>
                <h2 className="text-center login-title">Log in</h2>
                  <div className="row form-group">
                    <div className="col-sm-2 col-md-2 col-lg-2" />
                    <div className="col-sm-8 col-md-8 col-lg-8">
                      <input type="text" ref="user" placeholder="email*" className="form-control" onChange={(event) => {
                          const name="email"
                          const value=event.target.value
                          this.setState({
                              username: event.target.value,
                              type:true
                          }, () => { this.validateField(name, value) });
                      }}/>
                    </div>
                  </div>
                  <div className="row form-group">
                  <div className="col-sm-2 col-md-2 col-lg-2" />
                    <div className="col-sm-8 col-md-8 col-lg-8">
                    <input type="password" ref="pwd" placeholder="password*" className="form-control" onChange={(event) => {
                        const name="password"
                        const value=event.target.value
                        this.setState({
                            password: event.target.value,
                            type:true
                        }, () => { this.validateField(name, value) });
                    }}/>
                    </div>
                  </div>
                  <div className="row form-group">
                    <DisplayErrors displayErrors={this.state.displayErrors} />
                  </div>
                  <div className="row form-group">
                    <div className="col-sm-12 col-md-12 col-lg-12"><br/></div>
                    <div className="col-sm-2 col-md-2 col-lg-2"/>
                    <div className="col-sm-8 col-md-8 col-lg-8">
                    <button type="button" className="btn btn-primary home-btn" disabled={!this.state.formValid}  value="Submit" onClick={(event) => this.handleLogin(this.state)}>Submit</button>
                    </div>
                  </div>
                </form>
                </div>
                </div>


                <div className="row">
                <div className="col-sm-5 col-md-5 col-lg-5" >
                <div className="login-form">
                <form>
                <h2 className="text-center login-title">Register</h2>
                <div className="row form-group">
                  <div className="col-sm-2 col-md-2 col-lg-2" />
                  <div className="col-sm-8 col-md-8 col-lg-8">
                    <input type="text" ref="fname" placeholder="first name*" className="form-control" onChange={(event) => {
                        const name="fname"
                        const value=event.target.value
                        this.setState({
                            firstname: event.target.value,
                            type:true
                        }, () => { this.validateField2(name, value) });}}/>
                  </div>
                </div>
                <div className="row form-group">
                  <div className="col-sm-2 col-md-2 col-lg-2" />
                  <div className="col-sm-8 col-md-8 col-lg-8">
                    <input type="text" ref="lname" placeholder="last name*" className="form-control" onChange={(event) => {
                      const name="lname"
                      const value=event.target.value
                      this.setState({
                          lastname: event.target.value,
                          type:true
                      }, () => { this.validateField2(name, value) });}}/>
                  </div>
                </div>
                  <div className="row form-group">
                    <div className="col-sm-2 col-md-2 col-lg-2" />
                    <div className="col-sm-8 col-md-8 col-lg-8">
                      <input type="text" ref="usersignup" placeholder="email*" className="form-control" onChange={(event) => {
                          const name="email"
                          const value=event.target.value
                          this.setState({
                              username: event.target.value,
                              type:true
                          }, () => { this.validateField2(name, value) });}}/>
                    </div>
                  </div>
                  <div className="row form-group">
                    <div className="col-sm-2 col-md-2 col-lg-2" />
                    <div className="col-sm-8 col-md-8 col-lg-8">
                    <input type="password" ref="pwdsignup" placeholder="password*" className="form-control" onChange={(event) => {
                        const name="password"
                        const value=event.target.value
                        this.setState({
                            password: event.target.value,
                            type:true
                        }, () => { this.validateField2(name, value) });}}/>
                    </div>
                  </div>
                  <div className="row form-group">
                    <div className="col-sm-2 col-md-2 col-lg-2" />
                    <div className="col-sm-3 col-md-3 col-lg-3">
                    <input type="text" ref="code" placeholder="+1"  value={this.state.countrycode} className="form-control" onChange={(event) => {
                        const name="countrycode"
                        const value=event.target.value
                        this.setState({
                            countrycode: event.target.value,
                            type:true
                        }, () => { this.validateField2(name, value) });}}/>
                    </div>
                    <div className="col-sm-5 col-md-5 col-lg-5">
                    <input type="text" ref="ph" maxLength="10" placeholder="phone number*" className="form-control" onChange={(event) => {
                        const name="phone"
                        const value=event.target.value
                        this.setState({
                            phone: event.target.value,
                            type:true
                        }, () => { this.validateField2(name, value) });}}/>
                    </div>
                  </div>
                  <div className="row form-group">
                    <DisplayErrors displayErrors={this.state.displayErrors2} />
                  </div>
                  <div className="row ">
                    <div className="col-sm-12 col-md-12 col-lg-12"><br/></div>
                    <div className="col-sm-2 col-md-2 col-lg-2"/>
                    <div className="col-sm-8 col-md-8 col-lg-8">
                    <button type="button" className="btn btn-success home-btn" disabled={!this.state.formValid2}  value="Register" onClick={(event) => this.handleRegister(this.state)}>Register</button>
                    </div>
                  </div>
                  </form>
                  </div>
                </div>
                </div>
                </div>
              </div>
              )
            }
            </div>
        );
    }
}



export default withRouter(Home);
