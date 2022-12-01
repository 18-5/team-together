import React from 'react';
import Nav from "react-bootstrap/Nav";
import { LinkContainer } from "react-router-bootstrap";
import Logo from "../assets/logo.svg"

function Navigation() {
  return (
    <div className="h-100 d-flex flex-column justify-content-between py-3">
      <Nav variant="pills" className="flex-column gap-2">
        <LinkContainer to="/" className="bg-transparent">
          <Nav.Link><img src={Logo} alt="Team Together" /></Nav.Link>
        </LinkContainer>
        <div>
          <LinkContainer to="/">
            <Nav.Link eventKey="/">홈</Nav.Link>
          </LinkContainer>
          <LinkContainer to="explore">
            <Nav.Link eventKey="/explore">둘러보기</Nav.Link>
          </LinkContainer>
          <LinkContainer to="my-projects">
            <Nav.Link eventKey="/my-projects">내 프로젝트</Nav.Link>
          </LinkContainer>
          <LinkContainer to="search">
            <Nav.Link eventKey="/search" disabled>검색</Nav.Link>
          </LinkContainer>
          <LinkContainer to="messages">
            <Nav.Link eventKey="/messages" disabled>쪽지</Nav.Link>
          </LinkContainer>
          <LinkContainer to="notifications">
            <Nav.Link eventKey="/notifications" disabled>알림</Nav.Link>
          </LinkContainer>
        </div>
        <div>
          <LinkContainer to="connection-test">
            <Nav.Link eventKey="/connection-test">Connection Test</Nav.Link>
          </LinkContainer>
          <LinkContainer to="projects/1">
            <Nav.Link eventKey="/projects/1">Sample Project</Nav.Link>
          </LinkContainer>
        </div>
      </Nav>
      <Nav>
        <LinkContainer to="profile">
          <Nav.Link>프로필</Nav.Link>
        </LinkContainer>
      </Nav>
    </div>
  )
}

export default Navigation
