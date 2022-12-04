import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function APIConnection() {
  const [string, setString] = useState({
    title: "Failure",
    message: "Check if server running or match `target` in `vite.config.ts`` with api server."
  })

  useEffect(() => {
    axios.get('/api')
      .then((response) => {
        setString({ title: "Success", message: "Connection to server has been established." })
      })
      .catch((error) => {
        setString({ title: "Failure", message: string.message + error })
      })
  }, [])

  return (
    <div className="text-center h-100 py-4">
      <h1 className="display-3">{string.title}</h1>
      <p>{string.message}</p>
      <Link to={"/"} className="mb-4">
        홈으로 이동
      </Link>
    </div>
  )
}

export default APIConnection;
