import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";

function Tags(props: { tags: string }) {
  if (!props.tags || props.tags === "null") {
    return null;
  }

  return <span>{props.tags}</span>
}

function ProjectList(props: { APIURL: string }) {

  // TODO: too many useEffect calls
  const [data, setData] = useState<any>();
  useEffect(() => {
    async function ProjectsLoader() {
      console.log(props.APIURL);
      await axios.get(props.APIURL)
        .then(function (response) {
          setData(response.data);
        })
        .catch(function (error) {
          console.log(error);
        })
    }
    ProjectsLoader()
  }, [])

  if (!data) {
    return null;
  }

  return (
    <>
      {data.map((project: any, index: number) => (
        <div className="py-4 border-bottom" key={index}>
          <Link to={`/projects/${project.projectId}`}>
            <h2 className="h4 mb-1 text-dark">{project.projectName}</h2>
          </Link>
          <div className="mb-2 text-body">{project.description}</div>
          <div className="mb-2">{project.post}</div>
          <div className="d-flex gap-3 small text-muted">
            <div className="">{project.intake}명 모집</div>
            <div className="mb-1">명 지원 중</div>
          </div>
          <div className="d-flex gap-2 small text-muted">
            <Tags tags={project.tags} />
          </div>
        </div>
      ))
      }
    </>
  )
}

export default ProjectList
