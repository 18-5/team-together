import { PasteIcon, PencilIcon } from "@primer/octicons-react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Badge, Button, Col, Row, Tab, Tabs } from "react-bootstrap";
import { useCookies } from "react-cookie";
import { Link, useParams } from "react-router-dom";

function Project() {
  const [cookie] = useCookies(["user"]);
  const { projectId } = useParams();

  // Fetch data
  const [project, setProject] = useState({
    projectName: "", description: "", status: 0, dday: 0, intake: 0,
    // tags: ["태그1"],
    readme: "",
    post: ""
  });
  useEffect(() => { loadProject() }, [])

  const [leader, setLeader] = useState();
  useEffect(() => { loadLeader() }, [])

  const [member, setMember] = useState();
  useEffect(() => { loadMembers() }, [])

  const [applicants, setApplicants] = useState();
  useEffect(() => { loadApplicants() }, [])

  const [canApply, setCanApply] = useState(true);
  const [applied, setApplied] = useState(false);
  const [totalApplicants, setTotalApplicants] = useState(0);

  //
  const handleApplyButton = (e) => {
    applyCandidate()
    window.location.reload();
  }

  const handleDeleteButton = (e) => {
    deleteCandidate()
    window.location.reload();
  }

  // a and b are javascript Date objects
  function dateDiffInDays(a, b) {
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    // Discard the time and time-zone information.
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

    return Math.floor((utc2 - utc1) / _MS_PER_DAY);
  }

  async function loadProject() {
    await axios.get(`/api/projects/${projectId}`)
      .then(function (response) {
        console.log(response.data[0]);
        const data = response.data[0]
        const dday = dateDiffInDays(new Date(Date.now()), new Date(Date.parse(data.duedate)));
        setProject({
          projectName: data.projectName,
          description: data.description,
          status: data.projectState,
          dday: dday,
          intake: data.intake,
          // tags: ["태그1"],
          readme: data.readMe,
          post: data.post
        })
      })

  }

  async function loadLeader() {
    await axios.get(`/api/projects/${projectId}/members/leader`)
      .then(function (response) {
        console.log("leader");
        console.log(response.data[0]);
        setLeader(response.data[0]);
      })
  }

  async function loadMembers() {
    await axios.get(`/api/projects/${projectId}/members`)
      .then(function (response) {
        console.log(response.data);
        setMember(response.data);
      })
  }

  async function loadApplicants() {
    await axios.get(`/api/projects/${projectId}/applicants`)
      .then(function (response) {
        console.log(response.data);
        setApplicants(response.data);
        response.data.map((applicant: { userId: any; }) => {
          if (applicant.userId == cookie.user)
            setApplied(true);
        })
        setTotalApplicants(response.data.length)
      })
  }

  async function applyCandidate() {
    await axios.post(`/api/projects/${projectId}/applicants`, { userId: cookie.user })
      .then((res) => {
        console.log(res.data);
      })
  }

  async function deleteCandidate() {
    await axios.delete(`/api/projects/${projectId}/applicants/${cookie.user}`);
  }

  if (!project)
    return null;

  if (project.status == 0)
    project.status = "모집 중"

  return (
    <>
      <div className="tile">
        <div className="label-02 text-secondary mb-02">{project.description}</div>
        <h1 className="fluid-heading-04 text-primary">{project.projectName}</h1>
        <Badge className="mb-05" bg="success">{project.status}</Badge>
        {project.status == "모집 중" &&
          <div className="body-02 text-primary mb-05">{project.post}</div>
        }
        <div className="small text-muted mb-3">
          <div>지원 마감 {project.dday}일 전</div>
          <div>총 {project.intake}명 모집</div>
          <div>현재 {totalApplicants}명 지원 중</div>
        </div>


      </div>
      <div className="d-flex justify-content-end buttons-pulldown-to-tab">
        {canApply && !applied &&
          <Button variant="link" className="btn-medium" onClick={handleApplyButton}>지원하기<PasteIcon className="ml-03" /></Button>
        }
        {canApply && applied &&
          <Button variant="link" className="btn-medium danger" onClick={handleDeleteButton}>지원 취소하기<PasteIcon className="ml-03" /></Button>
        }
        <Link to={"edit"}>
          <Button variant="link" className="icon-only btn-medium"><PencilIcon /></Button>
        </Link>
      </div>
      <Tabs id="project">
        <Tab eventKey="overview" title="프로젝트 개요">
          <div className="tile">
            {project.readme}
          </div>
        </Tab>
        <Tab eventKey="members" title="팀원 및 지원자">
          <Row className="tile d-flex justify-content-between">
            <Col>팀장: {leader}</Col>
            <Col>팀원:</Col>
            <Col>지원자
              {applicants
                && applicants.map((a) => {
                  <div>{a.userName}</div>
                })}
            </Col>
          </Row>
        </Tab>
      </Tabs>
    </>
  )
}

export default Project

/*
tags rendering
  < div className = "small text-muted d-flex gap-2" >
  {
    project.tags ? project.tags.map((tag: any, index: number) => (
      <span key={index}>{tag}</span>
    )) : null
  }
</div >
*/
