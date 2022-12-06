import React from "react"
import { Badge, Col, Container, Row, Stack } from "react-bootstrap"
import Avatar from "./Avatar"
import avatarPlaceholder from '../../assets/avatar-placeholder.png'

function ProfileAbout(props: any) {
  console.log(props)
  return (
    <Row className="mb-3 align-items-center">
      <Col>
        <Stack direction="horizontal" className="gap-3">
          <Avatar avatarUrl={avatarPlaceholder} name={props.data.userName} />
          <div>
            <div className="h3">{props.data.userName}</div>
            <div>{props.data.userBio}</div>
            <div>{props.data.userId}</div>
          </div>
        </Stack>
      </Col>
      <Col>
        <div>{(<a href="mailto:${props.data.email}">{props.data.userEmail}</a>)}</div>
        <div>{props.data.userHomepage}</div>
        <div>{props.data.userSchool}</div>
      </Col>
    </Row>
  )
}

export function Experiences() {
  return (
    <Stack gap={3}>
      <Stack direction="horizontal" gap={1}>
        <div>경험</div>
        <Badge pill bg="light" text="dark">3</Badge>
      </Stack>
      <Stack direction="horizontal" gap={1}>
        <Badge pill bg="light" text="dark">UI/UX 이해</Badge>
        <Badge pill bg="light" text="dark">애자일</Badge>
        <Badge pill bg="light" text="dark">프로젝트 리딩</Badge>
      </Stack>
    </Stack>
  )
}

function Skills() {
  return (
    <Stack gap={3}>
      <Stack direction="horizontal" gap={1}>
        <div>스킬</div>
        <Badge pill bg="light" text="dark">7</Badge>
      </Stack>
      <Stack direction="horizontal" gap={1}>
        <Badge pill bg="light" text="dark">C</Badge>
        <Badge pill bg="light" text="dark">Java</Badge>
        <Badge pill bg="light" text="dark">Python</Badge>
        <Badge pill bg="light" text="dark">JavaScript</Badge>
        <Badge pill bg="light" text="dark">Adobe Photoshop</Badge>
        <Badge pill bg="light" text="dark">Git</Badge>
        <Badge pill bg="light" text="dark">React</Badge>
      </Stack>
    </Stack>
  )
}

function Projects() {
  return (
    <>
      <Stack direction="horizontal" gap={1}>
        <div>프로젝트</div>
        <Badge pill bg="light" text="dark">3</Badge>
      </Stack>
      <Container>
        <Row>
          <Col xxl={3}>
            <div>2022</div>
          </Col>
          <Col auto>
            <Stack gap={2}>
              <Stack>
                <div>Team Together</div>
                <div>프로젝트 팀 매칭 서비스</div>
              </Stack>
              <Stack>
                <div>BookDinosaur</div>
                <div>책을 사랑하는 사람들을 위한 소셜 네트워크 서비스</div>
              </Stack>
            </Stack>
          </Col>
        </Row>
      </Container>
    </>
  )
}

function AboutSection() {
  return (
    <Stack className="py-3" gap={5}>
      <Experiences />
      <Skills />
    </Stack>
  )
}

export default ProfileAbout
