import React from 'react';
import { useCookies } from "react-cookie";
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import { useNavigate, redirect } from 'react-router-dom';

export function ProfileLink() {
  const [cookies] = useCookies(["user"]);
  if (cookies.user) {
    return <div>프로필</div>
  } else {
    return null;
  }
}

export function LoginButton() {
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
    <div onClick={toggleLogin}>
      {cookies.user ? "로그아웃" : "로그인"}
    </div>
  )
}

