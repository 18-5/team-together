import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function ProjectList(props: { APIURL: string }) {
  const [data, setData] = useState<any>();
  useEffect(() => {
    async function ProjectsLoader() {
      await axios.get(props.APIURL)
        .then(function (response) {
          console.dir(response.data);
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
      {data.map((project: any, index: React.Key) => (
        <div className="py-4 border-bottom" key={index}>
          <Link to={`/projects/${project.projectId}`}>
            <h2 className="h4 mb-1 text-dark">{project.projectName}</h2>
          </Link>
          <div className="mb-2 text-body">{project.description}</div>
          <div className="mb-2">{project.post || "안녕하세요! 소프트웨어공학개론 1분반 수강하고 있는데 같이 열심히 하실 분 모집해요!"}</div>
          <div className="d-flex gap-3 small text-muted">
            <div className="">{project.intake || 9}명 모집</div>
            <div className="mb-1">{project.applicant_length || 4}명 지원 중</div>
          </div>
          <div className="d-flex gap-2 small text-muted">
            {project.tags ? project.tags.map((tag: any, index: number) => (
              <span key={index}>{tag}</span>
            )) : ["태그1", "태그2"].map((tag: any, index: number) => (
              <span key={index}>{tag}</span>
            ))}
          </div>
        </div>
      ))
      }
    </>
  )
}

export default ProjectList
