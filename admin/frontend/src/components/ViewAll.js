import React, {Component} from 'react';
import * as API from '../api/API';

import { MDBTable, MDBBtn, MDBDataTable } from 'mdbreact';
import './style.css';
class ViewAll extends Component {
  state={
    rows:[]
  };
  componentWillMount() {
    var r=[], rjson={};
    this.setState({rows:[]});
    API.getAllQuestions()
    .then((output) => {
      var l=output.length;
      for(var i=0; i<l; i++){
        var rjson= {
          question:output[i].question,
          answer: output[i].answer,
          category: output[i].category,
          age: <MDBBtn color="warning" className="glyphicon glyphicon-pencil" size="sm"></MDBBtn>,
          date: <MDBBtn color="danger" className="glyphicon glyphicon-trash" size="sm"></MDBBtn>
        };
        r.push(rjson);
      }

      this.setState({rows: r});
      console.log("length: "+l);
    });
   }

    render() {

  const data = {
    columns: [
      {
        label: 'Question',
        field: 'question',
        sort: 'asc',
        width: 150,
        minimal: 'lg'
      },
      {
        label: 'Answer',
        field: 'answer',
        sort: 'asc',
        width: 150,
        minimal: 'lg'
      },
      {
        label: 'Category',
        field: 'category',
        sort: 'asc',
        width: 150,
        minimal: 'lg'
      },
      {
        label: 'Edit',
        field: 'edit',
        width: 100,
        minimal: 'sm'
      },
      {
        label: 'Delete',
        field: 'delete',
        width: 100,
        minimal: 'sm'
      },
    ],
    rows: this.state.rows
  };
  var r={};


        return (
            <div className="w3-container">
              <div className="row">
              <div className="col-sm-2 col-md-2 col-lg-2" />
                <div className="col-sm-10 col-md-10 col-lg-10">

                  <MDBTable fixed btn>
                    <MDBDataTable striped bordered small data={data}/>
                  </MDBTable>
                </div>
              </div>
            </div>
        );
    }
}

export default ViewAll;
