import React from "react"
import avatarPlaceholder from '../assets/avatar-placeholder.png'
import Avatar from '../common/Avatar'
import Stack from 'react-bootstrap/Stack';
import { Tabs, Tab, Button } from "react-bootstrap";
import axios from "axios";
import ProjectInterface from "./ProjectInterface";

export async function getProfile(userid: string) {
  await axios.get('/api/users/' + userid)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    })
}

const sampleProjectData: ProjectInterface = {
  name: "Teamther",
  description: "프로젝트 팀 매칭 서비스",
  status: "모집 중",
  dueDate: new Date('2022-11-28'),
  intake: 4,
  leader: 1,
  members: [2, 3, 4],
  applicants: [5, 6]
}

const data: ProjectInterface = sampleProjectData



function ProjectPage() {
  const dday = Math.floor((data.dueDate.getTime() - Date.now()) / (1000 * 3600 * 24)) + 1
  const getStatus = () => {
    if (data.status == "모집 중") {
      if (dday < 0) {
        return "모집 마감";
      } else { return "모집 중"; }
    } else {
      return data.status;
    }
  }
  const projectStatus = getStatus();

  return (
    <Stack gap={3}>
      <Stack>
        <div>{data.name}</div>
        <div>{data.description}</div>
        <div>{projectStatus}</div>
        {projectStatus == "모집 중" ? (<div>지원 마감 {dday}일 전</div>) : null}

        <div>모집 인원 {data.intake}명</div>
        <div>현재 지원자 {data.applicants.length + data.members.length}명</div>
      </Stack>
      <Tabs id="project">
        <Tab eventKey="overview" title="프로젝트 개요">
          <h3>소개</h3>
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
            {data.members.map((member, index) => (
              <div key={index}>{member}</div>
            ))}
          </Stack>
          <div>지원자</div>
          <Stack>
            {data.applicants.map((applicant, index) => (
              <div key={index}>{applicant}</div>
            ))}
          </Stack>
        </Tab>
        <Tab eventKey="settings" title="프로젝트 관리">
          프로젝트 관리
        </Tab>
      </Tabs>
      <Button variant="primary">지원하기</Button>{' '}
    </Stack>
  )
}

export default ProjectPage
