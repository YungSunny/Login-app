import React from 'react'

const Welcome = (props) => {
    if(props.show === true){
        return (
            <div>
                You are logged in !
            </div>
        )
    }
    else {
        return (
        <div>
            &nbsp; 
        </div>
        )
    }

}

export default Welcome;