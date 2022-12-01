import React from 'react';
import Nav from "react-bootstrap/Nav";
import { useCookies } from "react-cookie";
import { LinkContainer } from "react-router-bootstrap";
import Logo from "../assets/logo.svg"
import { ProfileLink, LoginButton } from './Account';
import "./Navigation.scss"

function Navigation() {
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);

  return (
    <div className="h-100 py-3">
      <Nav variant="pills" className="h-100 pe-2 border-end flex-column justify-content-between">
        <div className="d-flex flex-column gap-3">
          <LinkContainer to="/" className="bg-transparent">
            <Nav.Link><img src={Logo} alt="Team Together" /></Nav.Link>
          </LinkContainer>
          <div className="d-flex flex-column">
            <LinkContainer to="/">
              <Nav.Link eventKey="/">홈</Nav.Link>
            </LinkContainer>
            <LinkContainer to="explore">
              <Nav.Link eventKey="/explore">둘러보기</Nav.Link>
            </LinkContainer>
            {cookies.user &&
              <LinkContainer to="my-projects">
                <Nav.Link eventKey="/my-projects">내 프로젝트</Nav.Link>
              </LinkContainer>
            }
            <LinkContainer to="search">
              <Nav.Link eventKey="/search" disabled>검색</Nav.Link>
            </LinkContainer>
            {cookies.user &&
              <LinkContainer to="messages">
                <Nav.Link eventKey="/messages" disabled>쪽지</Nav.Link>
              </LinkContainer>
            }
            {cookies.user &&
              <LinkContainer to="notifications">
                <Nav.Link eventKey="/notifications" disabled>알림</Nav.Link>
              </LinkContainer>
            }
          </div>
          <div>
            <LinkContainer to="connection-test">
              <Nav.Link eventKey="/connection-test">Connection Test</Nav.Link>
            </LinkContainer>
            <LinkContainer to="projects/1">
              <Nav.Link eventKey="/projects/1">Sample Project</Nav.Link>
            </LinkContainer>
          </div>
        </div>
        <div className="d-flex flex-column">
          {cookies.user &&
            <LinkContainer to="profile">
              <Nav.Link eventKey="/profile">
                <ProfileLink />
              </Nav.Link>
            </LinkContainer>
          }
          <Nav.Link>
            <LoginButton />
          </Nav.Link>
        </div>
      </Nav>
    </div>
  )
}

export default Navigation
