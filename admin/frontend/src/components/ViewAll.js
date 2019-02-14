import React, {Component} from 'react';
import * as API from '../api/API';

import { MDBTable, MDBBtn, MDBDataTable } from 'mdbreact';

class ViewAll extends Component {

    render() {

  const data = {
    columns: [
      {
        label: 'Question',
        field: 'question',
        sort: 'asc',
        width: 200
      },
      {
        label: 'Answer',
        field: 'answer',
        sort: 'asc',
        width: 200
      },
      {
        label: 'Category',
        field: 'category',
        sort: 'asc',
        width: 100
      },
      {
        label: 'Edit',
        field: 'edit',
        width: 30
      },
      {
        label: 'Delete',
        field: 'delete',
        width: 30
      },
    ],
    rows: [
      {
        name: 'Tiger Nixon',
        position: 'System Architect',
        office: 'Edinburgh',
        age: '61',
        date: <MDBBtn color="danger" size="sm">X</MDBBtn>
      },
      {
        name: 'Garrett Winters',
        position: 'Accountant',
        office: 'Tokyo',
        age: <MDBBtn color="danger" size="sm">X</MDBBtn>,
        date: <MDBBtn color="danger" size="sm">X</MDBBtn>
      },
      {
        name: 'Ashton Cox',
        position: 'Junior Technical Author',
        office: 'San Francisco',
        age: '66',
        date: <MDBBtn color="red" size="sm">X</MDBBtn>
      },
      {
        name: 'Cedric Kelly',
        position: 'Senior Javascript Developer',
        office: 'Edinburgh',
        age: '22',
        date: '2012/03/29'
      },
      {
        name: 'Herrod Chandler',
        position: 'Sales Assistant',
        office: 'San Francisco',
        age: '59',
        date: '2012/08/06'
      },
      {
        name: 'Rhona Davidson',
        position: 'Integration Specialist',
        office: 'Tokyo',
        age: '55',
        date: '2010/10/14'
      },
      {
        name: 'Colleen Hurst',
        position: 'Javascript Developer',
        office: 'San Francisco',
        age: '39',
        date: '2009/09/15'
      },
      {
        name: 'Haley Kennedy',
        position: 'Senior Marketing Designer',
        office: 'London',
        age: '43',
        date: '2012/12/18'
      },
      {
        name: 'Tatyana Fitzpatrick',
        position: 'Regional Director',
        office: 'London',
        age: '19',
        date: '2010/03/17'
      },
      {
        name: 'Michael Silva',
        position: 'Marketing Designer',
        office: 'London',
        age: '66',
        date: '2012/11/27'
      },
      {
        name: 'Paul Byrd',
        position: 'Chief Financial Officer (CFO)',
        office: 'New York',
        age: '64',
        date: '2010/06/09'
      },
      {
        name: 'Bradley Greer',
        position: 'Software Engineer',
        office: 'London',
        age: '41',
        date: '2012/10/13'
      },
      {
        name: 'Dai Rios',
        position: 'Personnel Lead',
        office: 'Edinburgh',
        age: '35',
        date: '2012/09/26'
      },
      {
        name: 'Jenette Caldwell',
        position: 'Development Lead',
        office: 'New York',
        age: '30',
        date: '2011/09/03'
      },
      {
        name: 'Yuri Berry',
        position: 'Chief Marketing Officer (CMO)',
        office: 'New York',
        age: '40',
        date: '2009/06/25'
      },
      {
        name: 'Caesar Vance',
        position: 'Pre-Sales Support',
        office: 'New York',
        age: '21',
        date: '2011/12/12'
      },
      {
        name: 'Doris Wilder',
        position: 'Sales Assistant',
        office: 'Sidney',
        age: '23',
        date: '2010/09/20'
      },
      {
        name: 'Jennifer Chang',
        position: 'Regional Director',
        office: 'Singapore',
        age: '28',
        date: '2010/11/14'
      },
      {
        name: 'Brenden Wagner',
        position: 'Software Engineer',
        office: 'San Francisco',
        age: '28',
        date: '2011/06/07'
      },
      {
        name: 'Fiona Green',
        position: 'Chief Operating Officer (COO)',
        office: 'San Francisco',
        age: '48',
        date: '2010/03/11'
      },
      {
        name: 'Shou Itou',
        position: 'Regional Marketing',
        office: 'Tokyo',
        age: '20',
        date: '2011/08/14'
      },
      {
        name: 'Michelle House',
        position: 'Integration Specialist',
        office: 'Sidney',
        age: '37',
        date: '2011/06/02',
      },
      {
        name: 'Suki Burks',
        position: 'Developer',
        office: 'London',
        age: '53',
        date: '2009/10/22'
      },
      {
        name: 'Prescott Bartlett',
        position: 'Technical Author',
        office: 'London',
        age: '27',
        date: '2011/05/07'
      },
      {
        name: 'Vivian Harrell',
        position: 'Financial Controller',
        office: 'San Francisco',
        age: '62',
        date: '2009/02/14',
      },
      {
        name: 'Bruno Nash',
        position: 'Software Engineer',
        office: 'London',
        age: '38',
        date: '2011/05/03',
      },
      {
        name: 'Sakura Yamamoto',
        position: 'Support Engineer',
        office: 'Tokyo',
        age: '37',
        date: '2009/08/19',
      },
      {
        name: 'Thor Walton',
        position: 'Developer',
        office: 'New York',
        age: '61',
        date: '2013/08/11',
      },
      {
        name: 'Jennifer Acosta',
        position: 'Junior Javascript Developer',
        office: 'Edinburgh',
        age: '43',
        date: '2013/02/01'
      },
      {
        name: 'Cara Stevens',
        position: 'Sales Assistant',
        office: 'New York',
        age: '46',
        date: '2011/12/06'
      },
      {
        name: 'Hermione Butler',
        position: 'Regional Director',
        office: 'London',
        age: '47',
        date: '2011/03/21',
        salary: '$356'
      },
      {
        name: 'Lael Greer',
        position: 'Systems Administrator',
        office: 'London',
        age: '21',
        date: '2009/02/27',
      },
      {
        name: 'Jonas Alexander',
        position: 'Developer',
        office: 'San Francisco',
        age: '30',
        date: '2010/07/14',
      },
      {
        name: 'Shad Decker',
        position: 'Regional Director',
        office: 'Edinburgh',
        age: '51',
        date: '2008/11/13'
      },
      {
        name: 'Michael Bruce',
        position: 'Javascript Developer',
        office: 'Singapore',
        age: '29',
        date: '2011/06/27'
      },
      {
        name: 'Donna Snider',
        position: 'Customer Support',
        office: 'New York',
        age: '27',
        date: '2011/01/25'
      }
    ]
  };

        return (
            <div className="w3-container">
              <h3>Database</h3>
              <div className="row">
              <div className="col-sm-2 col-md-2 col-lg-2" />
                <div className="col-sm-10 col-md-10 col-lg-10">

                  <MDBTable btn>
<MDBDataTable striped bordered small data={data}/>
</MDBTable>
                </div>
              </div>
            </div>
        );
    }
}

export default ViewAll;
