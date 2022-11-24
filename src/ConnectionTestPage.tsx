import React, { useEffect, useState } from "react";
import axios from "axios";

function ConnectionTestPage() {
  const [connection, setConnection] = useState(false);

  useEffect(() => {
    axios.get('/api')
      .then((response) => {
        console.log(response);
        setConnection(true);
      })
      .catch((error) => {
        console.log(error);
      })
  })

  if (connection) {
    return <div>Success. See JavaScript console log.</div>
  } else {
    return <div>Failure. Check if server running or match `target` in `vite.config.ts`` with api server. </div>
  }
}

export default ConnectionTestPage;
