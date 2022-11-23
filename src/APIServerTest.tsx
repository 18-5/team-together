import React from 'react';
import axios from 'axios';

let isconnection = false

const apiServerConnection = () => {
  axios.get('/api/profile')
    .then(res => {
      isconnection = true
    })
    .catch(err => {
      console.log(err);
    })
}

function APIServerTest() {
  return (
    <div>connection:{isconnection ? "TRUE" : "FALSE"}</div>
  )
}

export default APIServerTest
