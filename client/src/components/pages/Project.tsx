import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Tabs, Tab, Stack, Button } from "react-bootstrap";

function Project() {
  const { projectId } = useParams();

  // 데이터 로딩
  const [data, setData] = useState<any>();
  useEffect(() => {
    async function ProjectLoader() {
      await axios.get(`/api/projects/${projectId}`)
        .then(function (response) {
          console.log(response.data[0]);
          setData(response.data);
        })
        .catch(function (error) {
          console.log(error);
        })
    }
    ProjectLoader()
  }, [])

  const [leader, setLeader] = useState<any>();
  useEffect(() => {
    async function LeaderLoader() {
      await axios.get(`/api/projects/${projectId}/members/leader`)
        .then(function (response) {
          setLeader(response.data[0]);
        })
        .catch(function (error) {
          console.log(error);
        })
    }
    LeaderLoader()
  }, [])

  const [member, setMember] = useState<any>();
  useEffect(() => {
    async function MemberLoader() {
      await axios.get(`/api/projects/${projectId}/members`)
        .then(function (response) {
          console.log(response.data);
          setMember(response.data);
        })
        .catch(function (error) {
          console.log(error);
        })
    }
    MemberLoader()
  }, [])

  if (data) {
    const project = {
      projectName: data[0].projectName,
      description: data[0].description,
      status: data[0].projectState
    }

    if (project.status == 0)
      project.status = "모집 중"

    return (
      <div className="h-100 py-4">
        <div className="mb-3">
          <h3>{project.projectName}</h3>
          <p>{project.description}</p>
          {project.status}
          <div>projectId: {data[0].projectId}</div>
          <Link to={"edit"}>
            편집하기
          </Link>
        </div>
        <Tabs id="project">
          <Tab eventKey="overview" title="프로젝트 개요">
            <p>우리 팀은 ‘에브리타임’ 쪽지 기능을 이용해 꾸려지게 되었다. 우리 팀원들은 팀을 구하는
              과정에서 여러가지 어려움을 겪은 경험을 공유했다. 여기서 출발해 팀 매칭에 있어 좀 더
              효율적이고 체계적으로 팀을 구성할 수 있는 방법을 찾아보고자 한다.</p>
            <p>
              사용자는 개인별 프로필을 구성해 참여한 프로젝트, 팀원 간 상호 평가에서 받은 평가, 사용
              가능 한 기술 스택 등을 담을 수 있다. 이를 바탕으로 개설된 프로젝트에 참여하거나 다른
              사용자들과 소통할 수 있다. 이에 더해 맞춤형 추천으로 팀과 팀원을 매칭해주는 서비스를
              구상했다.
            </p>
          </Tab>
          <Tab eventKey="members" title="팀원 및 지원자">
            <div>팀장: {data.leader}</div>
            <div>팀원</div>
            <Stack>

            </Stack>
            <div>지원자</div>
            <Stack>

            </Stack>
          </Tab>
          <Tab eventKey="settings" title="프로젝트 관리">
            프로젝트 관리
          </Tab>
        </Tabs>
        <Button variant="primary">지원하기</Button>{' '}
      </div>
    )
  }
  return (
    <></>
  )
}

export default Project
