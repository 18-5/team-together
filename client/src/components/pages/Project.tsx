import React, { useEffect, useState } from "react";
import axios, { AxiosHeaders } from "axios";
import { useParams } from "react-router-dom";

function Project() {
  const { projectId } = useParams();

  // 데이터 로딩
  const [data, setData] = useState<any>();
  useEffect(() => {
    async function ProjectLoader() {
      await axios.get(`/api/projects/${projectId}`)
        .then(function (response) {
          console.log(response.data);
          setData(response.data);
        })
        .catch(function (error) {
          console.log(error);
        })
    }
    ProjectLoader()
  }, [])

  const [leader, setLeader] = useState<any>();
  useEffect(() => {
    async function LeaderLoader() {
      await axios.get(`/api/projects/${projectId}/members/leader`)
        .then(function (response) {
          console.log(response.data);
          setLeader(response.data);
        })
        .catch(function (error) {
          console.log(error);
        })
    }
  }, [])

  if (data) {
    const project = {
      projectName: data[0].projectName,
      description: data[0].description,
      status: data[0].projectState
    }

    if (project.status == 0)
      project.status = "모집 중"

    return (
      <div className="h-100 py-4">
        <h3>{project.projectName}</h3>
        <p>{project.description}</p>
        {project.status}
        <div>projectId: {data[0].projectId}</div>
      </div>
    )
  }
}

export default Project
