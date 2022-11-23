import React from "react";
import Stack from "react-bootstrap/Stack";
import Badge from 'react-bootstrap/Badge';
import { Col, Container, Row } from "react-bootstrap";

function Experiences() {
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

function About() {
  return (
    <div>

      <Stack gap={5}>
        <Experiences />
        <Skills />
        <Projects />
      </Stack>
    </div>
  )
}

export default About
