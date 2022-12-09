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
        <Link to={`/projects/${project.projectId}`} key={index}>
          <div className="tile-02">
            <div className="label-01 text-secondary mb-02">{project.description}</div>
            <h2 className="fluid-heading-03 text-primary mb-05">{project.projectName}</h2>
            <div className="body-01 text-primary  mb-05">{project.post}</div>
            <div className="d-flex gap-3">
              <div className="label-01 text-helper">{project.intake}명 모집</div>
              <div className="label-01 text-helper">명 지원 중</div>
            </div>

          </div>
        </Link>
      ))
      }
    </>
  )
}

export default ProjectList

/*
            <div className="d-flex gap-2 small text-muted">
              <Tags tags={project.tags} />
            </div>
*/
