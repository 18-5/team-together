import React from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import { useCookies } from 'react-cookie';
import ProjectList from '../elements/ProjectList';

function MyProjects() {
  const [cookies] = useCookies(["user"]);

  return (
    <div className="py-4">
      <div id='my-projects'>
        <Tabs id="project">
          <Tab eventKey="overview" title="지원 중">
            <ProjectList APIURL={`/api/projects?userid=${cookies.user}&filter=applied`} />
          </Tab>
          <Tab eventKey="members" title="진행 중">
            <ProjectList APIURL={`/api/projects?userid=${cookies.user}&filter=ongoing`} />
          </Tab>
          <Tab eventKey="settings" title="완료">
            <ProjectList APIURL={`/api/projects?userid=${cookies.user}&filter=completed`} />
          </Tab>
        </Tabs>
      </div>
    </div>
  )
}

export default MyProjects
