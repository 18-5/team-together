import React from 'react';
import { Stack } from 'react-bootstrap';
import { Outlet, Link } from 'react-router-dom';
import ProjectInterface from './ProjectInterface';

function ProjectEntry(props: { data: ProjectInterface }) {
  const dday = Math.floor((props.data.dueDate.getTime() - Date.now()) / (1000 * 3600 * 24)) + 1

  const getStatus = () => {
    if (props.data.status == "모집 중") {
      if (dday < 0) {
        return "모집 마감";
      } else { return "모집 중"; }
    } else {
      return props.data.status;
    }
  }

  const projectStatus = getStatus();

  return (
    <Stack gap={3} className="py-3">
      <Stack>
        <Stack direction="horizontal" gap={2}>
          <Link to={"/projects/" + props.data.id}><h3>{props.data.name}</h3></Link>
          <div>D-{dday}</div>
        </Stack>
        <div>{props.data.description}</div>
      </Stack>
      <div>{props.data.post}</div>
      <Stack gap={2}>
        <Stack direction='horizontal' gap={2}>
          <div>{props.data.intake}명 모집</div>
          <div>{props.data.applicants.length + props.data.members.length}명 지원 중</div>
        </Stack>
        <Stack direction='horizontal' gap={2}>
          {props.data.tags ? props.data.tags.map((tag, index) => (
            <span key={index}>{tag}</span>
          )) : null}
        </Stack>
      </Stack>
    </Stack>
  )
}

export default ProjectEntry
