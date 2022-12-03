import React from 'react';
import Nav from "react-bootstrap/Nav";
import { useCookies } from "react-cookie";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from 'react-router-dom';
import Logo from "../../assets/logo.svg"
import "./Sidebar.scss"


function ProfileLink() {
  const [cookies] = useCookies(["user"]);
  if (cookies.user) {
    return <div>{cookies.user}</div>
  } else {
    return null;
  }
}

function LoginButton() {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const toggleLogin = () => {
    if (cookies.user) {
      removeCookie("user");
      alert("로그아웃되었습니다");
      navigate("/"); // 작동 에러
    } else {
      setCookie("user", true,
        { path: "/" })
      alert("로그인 되었습니다.");
    }
  }

  return (
    <>
      {cookies.user ? (
        <Nav.Link onClick={toggleLogin}>로그아웃</Nav.Link>
      ) : (
        <LinkContainer to="login">
          <Nav.Link eventKey="login">로그인</Nav.Link>
        </LinkContainer>
      )}
    </>
  )
}

function Sidebar() {
  const [cookies] = useCookies(["user"]);
  const profileURL = "/profile/" + cookies.user;

  return (
    <Nav variant="pills" className="d-flex flex-column flex-nowrap h-100 justify-content-between py-4">
      <div className="d-flex flex-column gap-3 mb-3">
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
          <LinkContainer to={profileURL}>
            <Nav.Link eventKey={profileURL}>
              <ProfileLink />
            </Nav.Link>
          </LinkContainer>
        }
        <LoginButton />
      </div>
    </Nav>
  )
}

export default Sidebar
