import React from 'react';
import * as API from '../api/API';
import '../css/style.css';


// const getSuggestions = (id) => {
// }

const Suggestions = ({questionDetails, changeDisplay}) =>
    <div className="w3-container">
        <div className="row">
            <div className="col-sm-2 col-md-2 col-lg-2">
                <button className="btn-link" onClick={() => changeDisplay()}>Back</button>
            </div>
            <div className="col-sm-2 col-md-2 col-lg-2"/>
            <div className="col-sm-5 col-md-5 col-lg-5">
                <h3 className="page-title">Suggestions</h3>
            </div>
        </div>
        <div className="row">
            <div className="col-sm-2 col-md-2 col-lg-2"/>
            <div className="col-sm-10 col-md-10 col-lg-10">

                <table className="table-admin" style={{width: "100%"}}>
                    <tr className="table-content-admin">
                        <th className="table-content-admin">Question</th>
                        <th className="table-content-admin">Answer</th>
                        <th className="table-content-admin">Category</th>
                        <th className="table-content-admin">Applies To</th>
                    </tr>

                    {
                        questionDetails.map(q => {
                            return (
                                <tr key={Math.random()} className="table-content-admin">
                                    <td className="table-content-admin">{q.question} </td>
                                    <td className="table-content-admin">{q.answer}</td>
                                    <td className="table-content-admin">{q.category} </td>
                                    <td className="table-content-admin">{q.appliesTo}</td>
                                </tr>
                            )
                        })
                    }
                </table>
            </div>
        </div>

    </div>


export default Suggestions;
