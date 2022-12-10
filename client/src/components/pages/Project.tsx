import { CheckIcon, PasteIcon, PencilIcon, TrashIcon } from "@primer/octicons-react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Badge, Button, Col, Row, Stack, Tab, Tabs } from "react-bootstrap";
import { useCookies } from "react-cookie";
import { Link, useParams } from "react-router-dom";
import Avatar from "../elements/Avatar";
import avatarPlaceholder from '../../assets/avatar-placeholder.png'

function Project() {
  //
  // State
  //

  const [cookie] = useCookies(["user"]);
  const { projectId } = useParams();

  const [canApply, setCanApply] = useState(true);
  useEffect(() => {
    if (cookie.user === leader?.userId)
      setCanApply(false)
  })

  const [applied, setApplied] = useState(false);
  const [editing, setEditing] = useState(false);

  //
  // Data Variables
  //

  const [project, setProject] = useState({
    projectName: "", description: "", status: 0, dday: 0, intake: 0,
    // tags: ["태그1"],
    readme: "",
    post: "", createdAt: ""
  });
  useEffect(() => { loadProject() }, [])

  const [leader, setLeader] = useState<any>();
  useEffect(() => { loadLeader() }, [])

  const [members, setMembers] = useState<any>();
  useEffect(() => { loadMembers() }, [])

  const [applicants, setApplicants] = useState<any>();
  useEffect(() => { loadApplicants() }, [])

  const [totalApplicants, setTotalApplicants] = useState(0);
  useEffect(() => { setTotalApplicants(applicants?.length + members?.length - (leader ? 1 : 0)) })

  //
  // Functions
  //

  const handleApplyButton = () => {
    apply()
    window.location.reload();
  }

  const handleCancelApplyButton = () => {
    cancelApply()
    window.location.reload();
  }

  const handleEditingDoneButton = () => {
    setEditing(false);
  }

  const handleApplicantDeleteButton = (userId: string) => {
    deleteApplicant(userId)
    const newApplicants = applicants.filter((data) => { return data.userId !== userId })
    setApplicants(newApplicants)
    alert("지원자 삭제가 완료되었습니다.")
  }

  const handleApplicantAcceptButton = (userId: string) => {
    const applicant = applicants?.find((data) => { return data.userId === userId })
    const newApplicants = applicants?.filter((data) => { return data.userId !== userId })
    deleteApplicant(userId) // data
    addMember(userId) // data 
    setApplicants(newApplicants) // rendering
    members?.push(applicant) // rendering
  }

  const handleMemberDeleteButton = (userId: string) => {
    const member = members?.find((data) => { return data.userId === userId })
    applicants?.push(member)
    const newMembers = members?.filter((data) => { return data.userId !== userId })
    deleteMember(userId) // data
    addApplicant(userId) // data 
    setMembers(newMembers)  // rendering
    applicants?.push(member) // rendering
  }

  // a and b are javascript Date objects
  function dateDiffInDays(a: Date, b: Date) {
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
          post: data.post,
          createdAt: data.projectCreated
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
        setMembers(response.data);
      })
  }

  async function loadApplicants() {
    await axios.get(`/api/projects/${projectId}/applicants`)
      .then(function (response) {
        console.log("applicants" + response.data);
        setApplicants(response.data);
        response.data.map((applicant: { userId: any; }) => {
          if (applicant.userId == cookie.user)
            setApplied(true);
        })
      })
  }

  async function apply() {
    await axios.post(`/api/projects/${projectId}/applicants`, { userId: cookie.user })
  }

  async function cancelApply() {
    await axios.delete(`/api/projects/${projectId}/applicants/${cookie.user}`);
  }

  async function addApplicant(userId: string) {
    await axios.post(`/api/projects/${projectId}/applicants`, { userId: userId })
  }

  async function deleteApplicant(userId: string) {
    await axios.delete(`/api/projects/${projectId}/applicants/${userId}`);
  }

  async function addMember(userId: string) {
    await axios.post(`/api/projects/${projectId}/members`, { userId: userId })
  }

  async function deleteMember(userId: string) {
    await axios.delete(`/api/projects/${projectId}/members/${userId}`);
  }


  function isNewProject(dateString: string) {
    return dateDiffInDays(new Date(Date.parse(dateString)), new Date(Date.now())) < 5
  }

  //
  // Rendering
  //

  function StatusBadge(props: { status: number | any, createdDateString: string | any, dday: string | any }) {
    switch (props.status) {
      case 0:
        if (props.dday < 0)
          return <Badge className="mb-04 mr-03" bg="secondary">모집 마감</Badge>
        else if (props.dday < 3)
          return <Badge className="mb-04 mr-03" bg="warning">모집 마감 임박</Badge>
        else if (isNewProject(props.createdDateString))
          return <Badge className="mb-04 mr-03" bg="info">신규</Badge>
        else
          return <Badge className="mb-04 mr-03" bg="success">모집 중</Badge>
      case 2:
        return <Badge className="mb-04 mr-03" bg="secondary">진행 중</Badge>
      case 3:
        return <Badge className="mb-04 mr-03" bg="secondary">완료</Badge>
      default:
        return null
    }
  }

  if (!project)
    return null;

  return (
    <>
      <div className="tile-01">
        <div className="label-02 text-secondary mb-02">{project.description}</div>
        <h1 className="fluid-heading-04 text-primary">{project.projectName}</h1>
        <StatusBadge status={project.status} createdDateString={project.createdAt} dday={project.dday} />
        {project.status == 0 &&
          <div className="body-02 text-primary mb-05">{project.post}</div>
        }
        <div className="small text-muted mb-3">
          {project.status == 0 && project.dday > 0 &&
            <div>지원 마감 {project.dday}일 전</div>
          }
          <div>총 {project.intake}명 모집</div>
          {project.status == 0 &&
            <div>현재 {totalApplicants}명 지원 중</div>
          }
        </div>

      </div>
      <div className="d-flex justify-content-end buttons-pulldown-to-tab">
        {canApply && !applied &&
          <Button variant="link" className="btn-medium" onClick={handleApplyButton}>지원하기<PasteIcon className="ml-03" /></Button>
        }
        {canApply && applied &&
          <Button variant="link" className="btn-medium danger" onClick={handleCancelApplyButton}>지원 취소하기<PasteIcon className="ml-03" /></Button>
        }
        {cookie.user === leader?.userId &&
          <Link to={"edit"}>
            <Button variant="link" className="icon-only btn-medium"><PencilIcon /></Button>
          </Link>
        }
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

                (editing ?
                  // 편집 상태, 나중에 컴포넌트로 분리하기
                  <div className="tile-02 nonhover">
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
                  :
                  // 기본 상태
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
                )
              }

              {members?.length - (leader ? 1 : 0) > 0 &&
                <div className="tile-01">
                  <h2 className="fluid-heading-03 text-primary mb-05">팀원</h2>
                </div>
              }
              {members && leader &&
                members.map((member: any, index: number) => (
                  member.userId !== leader.userId &&

                  (editing ?
                    // 편집 상태
                    <div className={"tile-02 nonhover"} key={index}>
                      <div className="d-flex justify-content-between">
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
                        <div>
                          <Button title="팀원 해제" variant="link" className="icon-only danger" onClick={() => { handleMemberDeleteButton(member.userId) }}><TrashIcon />
                          </Button>
                        </div>
                      </div>
                    </div>
                    :
                    // 기본 상태
                    <Link to={`/profile/${member.userId}`} key={index}>
                      <div className={"tile-02"}>
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
                  )
                ))}
            </Col>
            <Col>
              {project.status == 0 && applicants?.length > 0 &&
                <div className="tile-01">
                  <h2 className="fluid-heading-03 text-primary">지원자</h2>
                </div>
              }
              {applicants &&
                applicants.map((applicant: any, index: number) => (

                  (editing ?
                    // 편집 상태
                    <div className="tile-02 nonhover" key={index}>
                      <div className="d-flex justify-content-between">
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
                        <div>
                          <Button title="팀원 수락" variant="link" className="icon-only" onClick={() => { handleApplicantAcceptButton(applicant.userId) }}><CheckIcon />
                          </Button>
                          <Button title="지원 거절" variant="link" className="icon-only danger" onClick={() => { handleApplicantDeleteButton(applicant.userId) }}><TrashIcon />
                          </Button>
                        </div>

                      </div>
                    </div>
                    :
                    // 기본 상태
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
                  )
                ))}

              {project.status === 0 && applicants?.length > 0 && cookie.user && leader?.userId &&
                (editing ?
                  <div>
                    <Button onClick={handleEditingDoneButton}>편집 완료</Button>
                  </div>
                  :
                  <div>
                    <Button variant="link" onClick={() => setEditing(true)}>지원자 편집하기</Button>
                  </div>
                )}

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
