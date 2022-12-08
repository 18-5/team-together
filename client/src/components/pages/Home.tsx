import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ProjectList from '../elements/ProjectList';
import { PencilIcon, PlusIcon, TelescopeIcon } from '@primer/octicons-react';

function Home() {
  const [view, setView] = useState("newest");
  const handleView = (e: { target: { value: string; }; }) => {
    setView(e.target.value);
  }

  return (
    <div className="py-05">
      <div className="d-flex justify-content-between">
        <Form className="d-flex align-items-center">
          <Form.Select onChange={handleView}>
            <option value="newest">최신순</option>
            <option value="timesensitive">마감 임박순</option>
          </Form.Select>
        </Form>
        <div className="d-flex">
          <Button variant="link" onClick={() => { return }}>행운의 프로젝트 발견하기<TelescopeIcon className="ml-03" /></Button>
          <Link to="/projects/new">
            <Button variant="link" className="icon-only"><PlusIcon /></Button>
          </Link>
        </div>
      </div>
      {view === "newest" && <ProjectList APIURL={"/api/projects?view=newest"} />}
      {view === "timesensitive" && <ProjectList APIURL={"/api/projects?view=timesensitive"} />}
    </div >
  )
}

export default Home
