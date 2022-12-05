import React, { useEffect, useState } from "react"
import Button from 'react-bootstrap/Button'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Stack from 'react-bootstrap/Stack';
import AboutSection from "../elements/About";
import ProfileAbout from "../elements/ProfileAbout";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useCookies } from "react-cookie";

function Profile() {
  const { userId } = useParams();
  const [cookie] = useCookies(["user"]);

  const [data, setData] = useState<any>();
  useEffect(() => {
    async function ProjectLoader() {
      await axios.get(`/api/users/${userId}`)
        .then(function (response) {
          console.log(response.data[0]);
          setData(response.data);
        })
        .catch(function (error) {
          console.log(error);
        })
    }
    ProjectLoader()
  }, [data])

  if (!data)
    return null;

  return (
    <div className="py-4">
      <ProfileAbout profileData={data[0]} />
      {userId == cookie.user ?
        <div className="d-flex justify-content-end mb-4 gap-2">
          <Button href="profile/edit" variant="outline-primary" className="mb-3">프로필 편집</Button>
        </div> : null}
      <Stack gap={3}>
        <Tabs
          defaultActiveKey="home"
          id="uncontrolled-tab-example"
          className="mb-3"
        >
          <Tab eventKey="home" title="개요">
            <AboutSection />
          </Tab>
          <Tab eventKey="profile" title="완료한 프로젝트">
          </Tab>
        </Tabs>
      </Stack>
    </div >
  )
}

export default Profile
