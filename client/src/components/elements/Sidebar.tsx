import React, { useEffect, useState } from 'react';
import Nav from "react-bootstrap/Nav";
import { useCookies } from "react-cookie";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate, useLocation } from 'react-router-dom';
import Logo from "../../assets/logo.svg"
import "./Sidebar.scss"
import { BellIcon, CommentIcon, HomeIcon, ProjectIcon, SearchIcon } from '@primer/octicons-react';

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
  const [login, setLogin] = useState(false);

  const Logout = () => {
    if (cookies.user) {
      removeCookie("user");
      setLogin(true);
      navigate("/");
    } else {
      setCookie("user", true,
        { path: "/" })
      alert("로그인 되었습니다.");
    }
  }

  return (
    <>
      {cookies.user ? (
        <Nav.Link onClick={Logout}>로그아웃</Nav.Link>
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
  const location = useLocation();
  useEffect(() => { return }, [location]);

  return (
    <Nav variant="pills" className="d-flex flex-column flex-nowrap h-100 justify-content-between">
      <div className="pt-05">
        <LinkContainer to="/" className="bg-transparent border-0">
          <Nav.Link><img src={Logo} alt="Team Together" /></Nav.Link>
        </LinkContainer>
        <div className="py-05 border-bottom">
          <LinkContainer to="/">
            <Nav.Link eventKey="/"><HomeIcon className="mr-06" />홈</Nav.Link>
          </LinkContainer>
          {cookies.user &&
            <LinkContainer to="my-projects">
              <Nav.Link eventKey="/my-projects"><ProjectIcon className="mr-06" />내 프로젝트</Nav.Link>
            </LinkContainer>
          }
          <LinkContainer to="search">
            <Nav.Link eventKey="/search" disabled><SearchIcon className="mr-06" />검색</Nav.Link>
          </LinkContainer>
          {cookies.user &&
            <LinkContainer to="messages">
              <Nav.Link eventKey="/messages"><CommentIcon className="mr-06" />쪽지</Nav.Link>
            </LinkContainer>
          }
          {cookies.user &&
            <LinkContainer to="notifications">
              <Nav.Link eventKey="/notifications"><BellIcon className="mr-06" />알림</Nav.Link>
            </LinkContainer>
          }
        </div>
        <div className="py-05">
          <LinkContainer to="connection-test">
            <Nav.Link eventKey="/connection-test">Connection Test</Nav.Link>
          </LinkContainer>
          <LinkContainer to="projects/1">
            <Nav.Link eventKey="/projects/1">Sample Project</Nav.Link>
          </LinkContainer>
        </div>
      </div>
      <div className="py-05">
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
