import React, {Component} from 'react';
import * as API from '../api/API';
import { MDBTable, MDBBtn, MDBDataTable } from 'mdbreact';
import Modal from 'react-responsive-modal';
import './style.css';
import './scripts.js';
class ViewAll extends Component {
  state={
    rows:[],
    rows1:[],
    open: false,
    categoriesList: [],
    appliestoList: ['Current Student', 'Prospective Student', 'Both'],
    editQuestion:'',
    editAnswer:'',
    editQuestionId:'',
    editAnswerId:'',
    editCategory:'',
    editApplyTo:'',
    editData:{}
  };

  onOpenModal = (data) => {
    console.log("edit: "+data.question);
    this.setState({ editQuestion: data.question,
      editAnswer: data.answer,
      editCategory: data.category,
      editApplyTo: data.applyTo,
      editQuestionId:data.questionId,
      editAnswerId:data.answerId,
      open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  componentWillMount() {
    this.getAllquestions();
    API.getAllCategories()
    .then((output) => {
      if(output.status!=1)
        alert("No categories in database");
      var l=output.categoryNames;
      this.setState({categoriesList: l});
    });
   }

   getAllquestions(){
     //var r=[], rjson={};
     //this.setState({rows:[]});
     this.setState({rows1:[]});
     API.getAllQuestions()
     .then((output) => {
       if(output.status!=1)
         alert("No data in database");
       var qnalist=output.questionAndAnswers;
       this.setState({rows1: qnalist});
       // var l=qnalist.length;
       // for(var i=0; i<l; i++){
       //   var q=qnalist[i].questionId,a=qnalist[i].answerId;
       //   var rjson= {
       //     question:qnalist[i].question,
       //     answer: qnalist[i].answer,
       //     category: qnalist[i].category,
       //     age: <MDBBtn color="warning" className="glyphicon glyphicon-pencil" size="sm"></MDBBtn>,
       //     date: <MDBBtn color="danger" className="glyphicon glyphicon-trash" size="sm" onClick={()=>this.handleDelete(q,a)}></MDBBtn>
       //   };
       //   r.push(rjson);
       // }
       // this.setState({rows: r});
       // console.log("length: "+l);
     });
   }

   handleEdit = (input) =>{
     alert(input.editQuestion);
     alert(input.editAnswer);
     alert(input.editCategory);
     alert(input.editApplyTo);
     var payload= ({question: input.editQuestion,
                    answer: input.editAnswer,
                    category: input.editCategory,
                    applyTo: input.editApplyTo,
                    questionId:input.editQuestionId,
                    answerId:input.editAnswerId,});

     API.editQuestionAndAnswer(payload)
         .then((output) => {
           console.log("check: "+output.status);
           if(output.status===1){
            alert("Delete successful");
            //this.getAllquestions();
          }
        })
   }

   handleDelete = (delQuestionId, delAnswerId) =>{
     //alert("here delete: "+delQuestionId+" "+delAnswerId);
     var payload= ({questionId: delQuestionId, answerId: delAnswerId});
     API.deleteQuestionAndAnswer(payload)
         .then((output) => {
           //console.log("check: "+output.status);
           if(output.status===1){
            alert("Delete successful");
            this.getAllquestions();
          }
        })
   }

    render() {
      const { open } = this.state;
  //
  // const data = {
  //   columns: [
  //     {
  //       label: 'Question',
  //       field: 'question',
  //       sort: 'asc',
  //       width: 150,
  //       minimal: 'lg'
  //     },
  //     {
  //       label: 'Answer',
  //       field: 'answer',
  //       sort: 'asc',
  //       width: 150,
  //       minimal: 'lg'
  //     },
  //     {
  //       label: 'Category',
  //       field: 'category',
  //       sort: 'asc',
  //       width: 150,
  //       minimal: 'lg'
  //     },
  //     {
  //       label: 'Edit',
  //       field: 'edit',
  //       width: 100,
  //       minimal: 'sm'
  //     },
  //     {
  //       label: 'Delete',
  //       field: 'delete',
  //       width: 100,
  //       minimal: 'sm'
  //     },
  //   ],
  //   rows: this.state.rows
  // };
  // var r={};
        return (
            <div className="w3-container">
              {/*<div className="row">
              <div className="col-sm-2 col-md-2 col-lg-2" />
                <div className="col-sm-10 col-md-10 col-lg-10">

                  <MDBTable fixed btn>
                    <MDBDataTable striped bordered small data={data}/>
                  </MDBTable>
                </div>
              </div>*/}



              <div className="row">
              <div className="col-sm-2 col-md-2 col-lg-2" />
                <div className="col-sm-10 col-md-10 col-lg-10">
                <table id="dtMaterialDesignExample" className="table table-striped table-bordered table-sm stripe1" cellSpacing="0" width="100%">
                  <thead>
                    <tr>
                      <th className="th-sm">Question</th>
                      <th className="th-sm">Answer</th>
                      <th className="th-sm">Category</th>
                      <th className="th-sm">Edit</th>
                      <th className="th-sm">Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                  {

                  this.state.rows1.map(r=>{
                    return(
                      <tr key={Math.random()}>
                        <td>{r.question}</td>
                        <td>{r.answer}</td>
                        <td>{r.category}</td>
                        <td><MDBBtn color="warning" className="glyphicon glyphicon-pencil" size="sm" onClick={()=>this.onOpenModal(r)}></MDBBtn></td>
                        <td><MDBBtn color="danger" className="glyphicon glyphicon-trash" size="sm" onClick={()=>this.handleDelete(r.questionId,r.answerId)}></MDBBtn></td>
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
                    <th className="th-sm">Edit</th>
                    <th className="th-sm">Delete</th>
                  </tr>
                  </tfoot>
                </table>
                </div>
                </div>

                <Modal open={open} onClose={this.onCloseModal} center>
                  <div className="w3-container">
                    <div className="row">
                      <div className="col-sm-4 col-md-4 col-lg-4" />
                      <div className="col-sm-8 col-md-8 col-lg-8">
                        <h2>Edit</h2>
                      </div>
                    </div>

                    <div className="row">
                      <form>
                        <div className="row form-group">
                          <div className="col-sm-2 col-md-2 col-lg-2" />
                          <div className="col-sm-8 col-md-8 col-lg-8">
                            <textarea type="text" ref="ques" placeholder="question*" className="form-control" onChange={(event) => {
                                                  this.setState({editQuestion: event.target.value});}} value={this.state.editQuestion}/>
                          </div>
                        </div>
                        <div className="row form-group">
                          <div className="col-sm-2 col-md-2 col-lg-2" />
                          <div className="col-sm-8 col-md-8 col-lg-8">
                            <textarea type="text" ref="ans" placeholder="answer*" className="form-control" onChange={(event) => {
                                                  this.setState({editAnswer: event.target.value});}} value={this.state.editAnswer}/>
                          </div>
                        </div>
                        <div className="row form-group">
                          <div className="col-sm-2 col-md-2 col-lg-2" />
                          <div className="col-sm-8 col-md-8 col-lg-8">
                            <select ref="catg" className="form-control" onChange={(event) => {this.setState({editCategory: event.target.value});}} value={this.state.editCategory}>
                              <option key="0" value="" selected="selected" disabled>Category*</option>
                              {
                                this.state.categoriesList.map(c=>{
                                  return(
                                    <option key={Math.random()} value={c}>{c}</option>
                                  )})
                              }
                            </select>
                          </div>
                        </div>
                        <div className="row form-group">
                          <div className="col-sm-2 col-md-2 col-lg-2" />
                          <div className="col-sm-8 col-md-8 col-lg-8">
                            <select ref="catg" className="form-control" onChange={(event) => {this.setState({editApplyTo: event.target.value});}} value={this.state.editApplyTo}>
                              <option key="0" value="" selected="selected" disabled>Students*</option>
                              {
                                this.state.appliestoList.map(a=>{
                                  return(
                                    <option key={Math.random()} value={a}>{a}</option>
                                  )})
                              }
                            </select>
                          </div>
                        </div>
                        <div className="row form-group">
                          <div className="col-sm-12 col-md-12 col-lg-12"><br/></div>
                          <div className="col-sm-2 col-md-2 col-lg-2"/>
                          <div className="col-sm-8 col-md-8 col-lg-8">
                            <button type="button" className="btn btn-primary home-btn"  value="Submit" onClick={(event) => this.handleEdit(this.state)}>Edit</button>
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

export default ViewAll;
