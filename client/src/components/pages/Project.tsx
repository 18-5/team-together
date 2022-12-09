import { PasteIcon, PencilIcon } from "@primer/octicons-react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Badge, Button, Col, Row, Stack, Tab, Tabs } from "react-bootstrap";
import { useCookies } from "react-cookie";
import { Link, useParams } from "react-router-dom";
import Avatar from "../elements/Avatar";
import avatarPlaceholder from '../../assets/avatar-placeholder.png'

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

  const [leader, setLeader] = useState<any>();
  useEffect(() => { loadLeader() }, [])

  const [members, setMembers] = useState<any>();
  useEffect(() => { loadMembers() }, [])

  const [applicants, setApplicants] = useState<any>();
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
        setMembers(response.data);
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

  function StatusBadge(props: { status: number }) {
    let statusString = "모집 중"
    if (project.status == 1) {
      statusString = "프로젝트 진행 중"
    }
    if (project.status == 3) {
      setCanApply(false);
      statusString = "프로젝트 마감"
    }

  }

  let statusString = "모집 중"
  if (project.status == 1) {
    statusString = "프로젝트 진행 중"
  }
  if (project.status == 3) {
    setCanApply(false);
    statusString = "프로젝트 마감"
  }

  return (
    <>
      <div className="tile-01">
        <div className="label-02 text-secondary mb-02">{project.description}</div>
        <h1 className="fluid-heading-04 text-primary">{project.projectName}</h1>
        <Badge className="mb-05" bg="success">{statusString}</Badge>
        {project.status == 0 &&
          <div className="body-02 text-primary mb-05">{project.post}</div>
        }
        <div className="small text-muted mb-3">
          {project.dday > 0 &&
            <div>지원 마감 {project.dday}일 전</div>
          }
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
          <div className="tile-01">
            {project.readme}
          </div>
        </Tab>
        <Tab eventKey="members" title="팀원 및 지원자">
          <Row className="d-flex justify-content-between">
            <Col>
              <div className="tile-01">
                <h2 className="fluid-heading-03 text-primary mb-05">팀장</h2>
              </div>
              {leader &&
                <Link to={`/profile/${leader.userId}`}>
                  <div className="tile-02">
                    <Stack direction="horizontal" className="gap-3">
                      <Avatar size={64} avatarUrl={avatarPlaceholder} name={leader.userName} />
                      <div>
                        <h2 className="body-02 text-body mb-02">{leader.userName}</h2>
                        <div className="body-01 text-body mb-02">{leader.userEmail}</div>
                        <div className="label-01 text-helper">
                        {leader.userBio}
                        </div>
                      </div>
                    </Stack>
                  </div>
                </Link>
              }
              <div className="tile-01">
                <h2 className="fluid-heading-03 text-primary mb-05">팀원</h2>
              </div>
              {members &&
                members.map((member: any, index: number) => (
                  <Link to={`/profile/${member.userId}`} key={index}>
                    <div className="tile-02">
                      <Stack direction="horizontal" className="gap-3">
                        <Avatar size={64} avatarUrl={avatarPlaceholder} name={member.userName} />
                        <div>
                          <h2 className="body-02 text-body mb-02">{member.userName}</h2>
                          <div className="body-01 text-body mb-02">{member.userEmail}</div>
                          <div className="label-01 text-helper">
                          {member.userBio}
                          </div>
                        </div>
                      </Stack>
                    </div>
                  </Link>
                ))}
            </Col>
            <Col>
              <div className="tile-01">
                <h2 className="fluid-heading-03 text-primary">지원자</h2>
              </div>
              {applicants &&
                applicants.map((applicant: any, index: number) => (
                  <Link to={`/profile/${applicant.userId}`} key={index}>
                    <div className="tile-02">
                      <Stack direction="horizontal" className="gap-3">
                        <Avatar size={64} avatarUrl={avatarPlaceholder} name={applicant.userName} />
                        <div>
                          <h2 className="body-02 text-body mb-02">{applicant.userName}</h2>
                          <div className="body-01 text-body mb-02">{applicant.userEmail}</div>
                          <div className="label-01 text-helper">
                          {applicant.userBio}
                          </div>
                        </div>
                      </Stack>
                    </div>
                  </Link>
                ))}
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
