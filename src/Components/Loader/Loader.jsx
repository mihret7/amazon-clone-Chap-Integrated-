// import React from 'react'
import React from 'react'

// import loading spinner from react-spinners
import {BeatLoader} from 'react-spinners'


function Loader() {
  return (
    <div
    style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "50vh",
      }}
    
    >

    <BeatLoader color="black" />
    
    </div>
  )
}

export default Loader