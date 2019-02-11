import React from 'react';
const DisplayErrors = ({displayErrors}) =>
  <div>
    {Object.keys(displayErrors).map((fieldName, i) => {
      if(displayErrors[fieldName].length > 0){
        return (
          <p key={i} style={{color:"red",fontSize:"14px",marginBottom:"5px"}}>{fieldName} {displayErrors[fieldName]}</p>
        )
      } else {
        return '';
      }
    })}
  </div>
export default DisplayErrors;
