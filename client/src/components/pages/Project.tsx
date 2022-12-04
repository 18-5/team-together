import axios from "axios";
import React, { useEffect, useState } from "react";
import { Badge, Button, Col, Row, Tab, Tabs } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";

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
      status: data[0].projectState,
      dday: 9,
      intake: 4,
      applicant_length: 9,
      tags: ["태그1"],
      readme: ""
    }

    if (project.status == 0)
      project.status = "모집 중"

    return (
      <div className="h-100 py-4">
        <div className="mb-4">
          <h1 className="h3 mb-1 text-dark">{project.projectName}</h1>
          <div className="mb-2 text-body">{project.description}</div>
          <Badge className="mb-4" bg="secondary">{project.status}</Badge>
          <div className="small text-muted mb-3">
            <div>지원 마감 {project.dday}일 전</div>
            <div>총 {project.intake}명 모집</div>
            <div>현재 {project.applicant_length}명 지원 중</div>
          </div>
          <div className="small text-muted d-flex gap-2 mb-4">
            {project.tags ? project.tags.map((tag: any, index: number) => (
              <span key={index}>{tag}</span>
            )) : null}
          </div>
          <div className="d-flex gap-2">
            <Button variant="primary">지원하기</Button>
            <Link to={"edit"}>
              <Button variant="outline-primary">편집하기</Button>
            </Link>
          </div>
        </div>
        <Tabs id="project">
          <Tab eventKey="overview" title="프로젝트 개요">
            <p>{project.readme}</p>
          </Tab>
          <Tab eventKey="members" title="팀원 및 지원자">
            <Row className="d-flex justify-content-between">
              <Col>팀장: {leader}</Col>
              <Col>팀원:</Col>
              
              <Col>지원자</Col>
            </Row>
          </Tab>
        </Tabs>
      </div>
    )
  }
  return (
    <></>
  )
}

export default Project
