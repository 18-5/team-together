import axios from "axios";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, redirect } from "react-router-dom";
import Logo from '../../assets/logo.svg';

function Login() {
  const [validated, setValidated] = useState(false);
  const [state, setState] = useState({
    userId: "",
    userName: "test",
    userPwd: "",
    userEmail: "d",
    userHomepage: "d",
    userSchool: "d",
    userBio: "d"
  });

  const handleSubmit = (e: { currentTarget: any; preventDefault: () => void; stopPropagation: () => void; }) => {
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    setValidated(true);
    createUser();
  };

  const handleChange = (e: { target: { id: any; value: any; }; }) => {
    const { id, value } = e.target
    setState(prevState => ({
      ...prevState,
      [id]: value
    }))
  }

  async function createUser() {
    await axios.post("/api/auth", {
      userId: state.userId,
      userPwd: state.userPwd
    })
      .then((res) => {
        if (res.data) {
          console.log("success")
          alert(`${res.data.userName}님 환영합니다`)
          redirect("/sign-in")
        } else {
          console.log(res);
          alert("일치하는 사용자 이름이 없거나 암호가 다릅니다.");
        }
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      })
  }

  return (
    <>
      <Link to={"/"} className="mb-4">
        <img width="80" src={Logo} alt="Team Together" />
      </Link>
      <h3 className="mb-4">로그인</h3>
      <Form className="w-100 mx-5" noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group className="mb-2" controlId="userId">
          <Form.Control required type="text" placeholder="사용자 이름" maxLength={20} value={state.userId} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-4" controlId="userPwd">
          <Form.Control required type="password" placeholder="암호" maxLength={20} value={state.userPwd} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Button className="w-100" type="submit">로그인</Button>
        </Form.Group>
      </Form>
      <Link to={"/sign-up"}>
        <div>계정 만들기</div>
      </Link>
    </>
  )
}

export default Login
