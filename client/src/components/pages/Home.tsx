import { PlusIcon, TelescopeIcon } from '@primer/octicons-react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';
import ProjectList from '../patterns/ProjectList';

function Home() {
  const [cookie] = useCookies(["user"]);
  const [view, setView] = useState("newest");
  const [recommendation, setRecommendation] = useState<any>();
  useEffect(() => { RecommendatedProjectLoader() }, [])

  async function RecommendatedProjectLoader() {
    await axios.get(`/api/projects/recommendation/${cookie.user}`)
      .then(function (res) {
        setRecommendation(res.data[0]);
      })
  }

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
        {cookie.user &&
          <div className="d-flex">
            {recommendation &&
              <Link to={`projects/${recommendation.projectId}`}>
                <Button variant="link" onClick={() => { return }}>행운의 프로젝트 발견하기<TelescopeIcon className="ml-03" /></Button>
              </Link>
            }
            <Link to="/projects/new">
              <Button variant="link" className="icon-only"><PlusIcon /></Button>
            </Link>
          </div>
        }
      </div>
      {view === "newest" && <ProjectList APIURL={"/api/projects?view=newest"} />}
      {view === "timesensitive" && <ProjectList APIURL={"/api/projects?view=timesensitive"} />}
    </div >
  )
}

export default Home
