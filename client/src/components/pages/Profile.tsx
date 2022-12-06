import React, { useEffect, useState } from "react"
import Button from 'react-bootstrap/Button'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Stack from 'react-bootstrap/Stack';

import ProfileAbout from "../elements/ProfileAbout";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import ProjectList from "../elements/ProjectList";

function Profile() {
  const { userId } = useParams();
  const [cookie] = useCookies(["user"]);

  const [data, setData] = useState<any>();
  useEffect(() => {
    async function ProfileLoader() {
      await axios.get(`/api/users/${userId}`)
        .then(function (response) {
          console.log(response.data[0]);
          setData(response.data);
        })
        .catch(function (error) {
          console.log(error);
        })
    }
    ProfileLoader()
  }, [])

  if (!data)
    return null;

  return (
    <div className="py-4">
      <ProfileAbout data={data[0]} />
      <div className="d-flex justify-content-end gap-2 buttons-pulldown-to-tab">
        <Button href="/messages/new" variant="primary">쪽지 작성하기</Button>
        {userId == cookie.user ?
          <Button href={userId + "/edit"} variant="outline-primary">프로필 편집</Button> : null}
      </div>
      <Tabs defaultActiveKey="home">
        <Tab eventKey="home" title="개요">
        </Tab>
        <Tab eventKey="profile" title="완료한 프로젝트">
          <ProjectList APIURL={`/api/projects?userid=${cookie.user}&filter=completed`} />
        </Tab>
      </Tabs>
    </div >
  )
}

export default Profile
