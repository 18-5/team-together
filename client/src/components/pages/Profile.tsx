import React, { useEffect, useState } from "react";
import { PencilIcon } from "@primer/octicons-react";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useCookies } from "react-cookie";
import { Link, useParams } from "react-router-dom";
import ProfileAbout, { Experiences, Skills } from "../patterns/ProfileAbout";
import ProjectList from "../patterns/ProjectList";

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
    <>
      <div className="tile-01">
        <ProfileAbout data={data[0]} />
      </div>
      <div className="d-flex justify-content-end buttons-pulldown-to-tab">
        {userId != cookie.user &&
          <Link to="/messages/new">
            <Button variant="link" className="btn-medium">쪽지 작성하기</Button>
          </Link>
        }
        {userId == cookie.user &&
          <Link to={"edit"}>
            <Button variant="link" className="icon-only btn-medium"><PencilIcon /></Button>
          </Link>
        }
      </div>
      <Tabs defaultActiveKey="home">
        <Tab eventKey="home" title="개요">
          <div className="tile-03">
            <Skills />
          </div>
          <div className="tile-03">
            <Experiences />
          </div>
        </Tab>
        <Tab eventKey="profile" title="완료한 프로젝트">
          <ProjectList APIURL={`/api/projects?userid=${cookie.user}&filter=completed`} />
        </Tab>
      </Tabs>
    </ >
  )
}

export default Profile
