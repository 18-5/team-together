import React, { useEffect, useState } from 'react';
import { BellIcon, CommentIcon, HomeIcon, ProjectIcon, SearchIcon } from '@primer/octicons-react';
import axios from 'axios';
import { Stack } from 'react-bootstrap';
import Nav from "react-bootstrap/Nav";
import { useCookies } from "react-cookie";
import { LinkContainer } from "react-router-bootstrap";
import { useLocation, useNavigate } from 'react-router-dom';
import avatarPlaceholder from '../../assets/avatar-placeholder.png';
import Logo from "../../assets/logo.svg";
import Avatar from '../patterns/Avatar';
import "./Sidebar.scss";

function ProfileLink() {
  const [cookie] = useCookies(["user"]);
  if (!cookie.user)
    return null

  const [data, setData] = useState<any>();
  useEffect(() => { ProfileLoader() }, [])

  async function ProfileLoader() {
    await axios.get(`/api/users/${cookie.user}`)
      .then(function (response) {
        setData(response.data[0]);
      })
  }

  if (!data)
    return null

  return (
    <Stack direction='horizontal'>
      <Avatar size={32} avatarUrl={avatarPlaceholder} name={cookie.user} />
      <div className="ml-06">{data.userName}</div>
    </Stack>
  )
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
        <div className="py-05">
          <LinkContainer to="/">
            <Nav.Link eventKey="/"><HomeIcon className="mr-06" />홈</Nav.Link>
          </LinkContainer>
          {cookies.user &&
            <LinkContainer to="my-projects">
              <Nav.Link eventKey="/my-projects"><ProjectIcon className="mr-06" />내 프로젝트</Nav.Link>
            </LinkContainer>
          }
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
      </div>
      <div className="py-05">
        {cookies.user &&
          <LinkContainer to={profileURL}>
            <Nav.Link eventKey={profileURL} className="profile-link">
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
