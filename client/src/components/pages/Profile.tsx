import React, { useEffect, useState } from "react"
import Button from 'react-bootstrap/Button'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Stack from 'react-bootstrap/Stack';

import ProfileAbout from "../elements/ProfileAbout";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import ProjectList from "../elements/ProjectList";
import { PencilIcon } from "@primer/octicons-react";

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
    <div>
      <div className="tile">
        <ProfileAbout data={data[0]} />
      </div>
      <div className="d-flex justify-content-end buttons-pulldown-to-tab">
        <Link to="/messages/new">
          <Button variant="link" className="btn-medium">쪽지 작성하기</Button>
        </Link>
        {userId == cookie.user ?
          <Link to={"edit"}>
            <Button variant="link" className="icon-only btn-medium"><PencilIcon /></Button>
          </Link>
          : null}
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
