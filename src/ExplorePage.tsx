import React from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import ProjectEntry from './my-projects/ProjectEntry';

function ExplorePage() {
  return (
    <Tabs
      defaultActiveKey="profile"
      id="uncontrolled-tab-example"
      className="mb-3"
    >
      <Tab eventKey="home" title="Home">
        hi
      </Tab>
      <Tab eventKey="profile" title="Profile">
        <ProjectEntry/>
      </Tab>
      <Tab eventKey="contact" title="Contact" disabled>
        gdf
      </Tab>
    </Tabs>
  )
}

export default ExplorePage
