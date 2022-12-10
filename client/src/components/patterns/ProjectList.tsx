import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Badge, Stack } from "react-bootstrap";

function ProjectList(props: { APIURL: string }) {
  const [data, setData] = useState<any>();
  useEffect(() => { ProjectsLoader() }, [])

  async function ProjectsLoader() {
    await axios.get(props.APIURL)
      .then(function (response) {
        setData(response.data);
        console.log(response.data)
      })
  }

  // a and b are javascript Date objects
  function dateDiffInDays(a: Date, b: Date) {
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    // Discard the time and time-zone information.
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

    return Math.floor((utc2 - utc1) / _MS_PER_DAY);
  }

  function dday(dateString: string) {
    return dateDiffInDays(new Date(Date.now()), new Date(Date.parse(dateString)))
  }

  function isNewProject(dateString: string) {
    return dateDiffInDays(new Date(Date.parse(dateString)), new Date(Date.now())) < 5
  }

  function isImminent(dueDateString: string) {
    return dday(dueDateString) <= 3
  }

  function isClosed(dueDateString: string) {
    return dday(dueDateString) < 0
  }

  function StatusBadge(props: { status: number | any, createdDateString: string | any, dueDateString: string | any }) {
    switch (props.status) {
      case 0:
        if (isClosed(props.dueDateString))
          return <Badge className="mb-04 mr-03" bg="secondary">모집 마감</Badge>
        else if (isImminent(props.dueDateString))
          return <Badge className="mb-04 mr-03" bg="warning">마감 임박</Badge>
        else if (isNewProject(props.createdDateString))
          return <Badge className="mb-04 mr-03" bg="info">신규</Badge>
        else
          return <Badge className="mb-04 mr-03" bg="success">모집 중</Badge>
      case 2:
        return <Badge className="mb-04 mr-03" bg="secondary">진행 중</Badge>
      case 3:
        return <Badge className="mb-04 mr-03" bg="secondary">완료</Badge>
      default:
        return null
    }
  }

  if (!data) {
    return null;
  }

  return (
    <>
      {data.map((project: any, index: number) => (
        <Link to={`/projects/${project.projectId}`} key={index}>
          <div className="tile-02">
            <div className="label-01 text-secondary mb-02">{project.description}</div>
            <Stack direction="horizontal">
              <StatusBadge status={project.projectState} createdDateString={project.projectCreated} dueDateString={project.duedate} />
              <h2 className="fluid-heading-03 text-primary mb-05">{project.projectName}</h2>
            </Stack>
            {project.projectState == 0 &&
              <>
                <div className="body-01 text-primary mb-05">{project.post}</div>

                {dday(project.duedate) > 0 &&
                  <div className="label-01 text-helper">지원 마감 {dday(project.duedate)}일 전</div>
                }
                <div className="label-01 text-helper">{project.intake}명 모집</div>
              </>
            }
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
