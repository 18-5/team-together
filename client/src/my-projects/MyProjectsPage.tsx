import axios from 'axios';
import React, { useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Stack } from 'react-bootstrap';
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';

function MyProjectsPage() {
  const [allProjects, setAllProjects] = useState(null);

  function LeadingProjects() {
    const [cookie] = useCookies();
    const reqURL = "/api/users/" + cookie.user + "/leader";
    axios.get(reqURL)
      .then((res) => {
        console.log(res);
        return (
          <div>{res.data}</div>
        )
      })
      .catch((err) => {
        console.log(err);
      })
    return (
      <></>
    )
  }

  function AppliedProjects() {
    return null;
  }

  async function getAllProjects() {
    await axios.get("/projects")
      .then((res) => {
        console.log(res);
        setAllProjects(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const AllProjects = () => {
    getAllProjects();
    return (
      allProjects.map((project: { projectId: string; projectName: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; description: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; post: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; intake: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; applicants: string | any[]; members: string | any[]; }) => {
        <Stack gap={3} className="py-3">
          <Stack>
            <Stack direction="horizontal" gap={2}>
              <Link to={"/projects/" + project.projectId}><h4>{project.projectName}</h4></Link>
              <div>D-</div>
            </Stack>
            <div>{project.description}</div>
          </Stack>
          <div>{project.post}</div>
          <Stack gap={2}>
            <Stack direction='horizontal' gap={2}>
              <div>{project.intake}명 모집</div>
              <div>{project.applicants.length + project.members.length}명 지원 중</div>
            </Stack>
            <Stack direction='horizontal' gap={2}>
              h
            </Stack>
          </Stack>
        </Stack>
      })
    )
  }

  return (
    <div className="py-4">
      <Tabs
        defaultActiveKey="home"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="home" title="Home">
          {AllProjects()}
        </Tab>
        <Tab eventKey="profile" title="Profile">
          helo
        </Tab>
        <Tab eventKey="contact" title="Contact" disabled>
          gdf
        </Tab>
      </Tabs>
    </div>
  )
}

export default MyProjectsPage
