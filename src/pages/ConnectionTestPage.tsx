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

  let message = "Failure. Check if server running or match `target` in `vite.config.ts`` with api server.";
  if (connection) {
    message = "Success. See JavaScript console log."
  }

  return (
    <div className="py-3">
      {message}
    </div>
  )
}

export default ConnectionTestPage;
