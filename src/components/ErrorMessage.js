import React from 'react'
import './ErrorMessage.css'

const ErrorMessage = (props) => {
    if(!props.touched){
        return (
            <div>
               &nbsp; 
            </div>
        )
    }
    if (props.errors){
        return (
            <div className="errors">
                {props.errors}
            </div>
        )
    }
    return (
        <div className="valid">
            Valid
        </div>
    )
}

export default ErrorMessage;