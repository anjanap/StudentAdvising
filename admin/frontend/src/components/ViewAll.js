import React, {Component} from 'react';
import * as API from '../api/API';
import { MDBTable, MDBBtn, MDBDataTable } from 'mdbreact';
import './style.css';
import './scripts.js';
class ViewAll extends Component {
  state={
    rows:[],
    rows1:[]
  };

  componentWillMount() {
    this.getAllquestions();
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
   handleDelete = (delQuestionId, delAnswerId) =>{
     //alert("here delete: "+delQuestionId+" "+delAnswerId);
     var payload= ({questionId: delQuestionId, answerId: delAnswerId});
     API.deleteQuestionAndAnswer(payload)
         .then((output) => {
           console.log("check: "+output.status);
           if(output.status===1){
            alert("Delete successful");
            this.getAllquestions();
          }
          })
   }

    render() {
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
                <table id="dtMaterialDesignExample" className="table table-striped table-bordered table-sm stripe1" cellspacing="0" width="100%">
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

                  this.state.rows1.map(r=>{console.log(r.question);
                    return(

                      <tr key={Math.random()}>
                        <td>{r.question}</td>
                        <td>{r.answer}</td>
                        <td>{r.category}</td>
                        <td><MDBBtn color="warning" className="glyphicon glyphicon-pencil" size="sm"></MDBBtn></td>
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

            </div>
        );
    }
}

export default ViewAll;
