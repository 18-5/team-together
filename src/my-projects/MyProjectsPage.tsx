import React from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import ProjectEntry from '../project/ProjectEntry';

function MyProjectsPage() {
  return (
    <Tabs
      defaultActiveKey="home"
      id="uncontrolled-tab-example"
      className="mb-3"
    >
      <Tab eventKey="home" title="Home">
        <ProjectEntry />
      </Tab>
      <Tab eventKey="profile" title="Profile">
        helo
      </Tab>
      <Tab eventKey="contact" title="Contact" disabled>
        gdf
      </Tab>
    </Tabs>
  )
}

export default MyProjectsPage
