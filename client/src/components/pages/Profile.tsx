import React from "react"
import Button from 'react-bootstrap/Button'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Stack from 'react-bootstrap/Stack';

function ProfilePage() {
  // The process of loading profile of current session is required.
  const profileData = sampleProfileData

  return (
    <div className="py-3">
      <Stack gap={3}>
        <Button href="profile/edit" variant="outline-primary">프로필 편집</Button>
        <Tabs
          defaultActiveKey="home"
          id="uncontrolled-tab-example"
          className="mb-3"
        >
          <Tab eventKey="home" title="개요">
            <About />
          </Tab>
          <Tab eventKey="profile" title="완료한 프로젝트">
            <Projects />
          </Tab>
          <Tab eventKey="contact" title="리뷰">
            <Review data={sampleReviewData} />
          </Tab>
        </Tabs>
      </Stack>
    </div >
  )
}

export default ProfilePage
