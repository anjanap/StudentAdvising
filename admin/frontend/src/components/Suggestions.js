import React from 'react';
import * as API from '../api/API';
import '../css/style.css';



// const getSuggestions = (id) => {
// }

const Suggestions = ({changeDisplay}) =>
    <div className="w3-container">
        <div className="row">
            <div className="col-sm-2 col-md-2 col-lg-2">
                <button className="btn-link" onClick={()=>changeDisplay()}>Back</button>
            </div>
            <div className="col-sm-2 col-md-2 col-lg-2" />
            <div className="col-sm-5 col-md-5 col-lg-5">
                <h3 className="page-title">Suggestions</h3>
            </div>
        </div>
        <div className="row">

        </div>
    </div>


export default Suggestions;
