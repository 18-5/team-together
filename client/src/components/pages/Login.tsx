import axios from "axios";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import Logo from '../../assets/logo.svg';

function Login() {
  const [validated, setValidated] = useState(false);
  const [cookie, setCookie] = useCookies(["user"]);
  const [state, setState] = useState({
    id: "",
    pw: ""
  });
  const navigate = useNavigate();

  const handleSubmit = (e: { currentTarget: any; preventDefault: () => void; stopPropagation: () => void; }) => {
    const form = e.currentTarget;
    e.preventDefault();

    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    setValidated(true);
    createSession();
  };

  const handleChange = (e: { target: { id: any; value: any; }; }) => {
    const { id, value } = e.target
    setState(prevState => ({
      ...prevState,
      [id]: value
    }))
  }

  function createCookie() {
    setCookie("user", state.id, { path: "/" }); // DEBUG
  }

  async function createSession() {
    await axios.post("/api/auth", {
      id: state.id,
      pw: state.pw
    })
      .then((res) => {
        if (res.data.length > 0) {
          alert(`${res.data[0].userName}님 환영합니다`)
          createCookie();
          navigate("/");
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
        <img src={Logo} alt="Team Together" />
      </Link>
      <h3 className="mb-4">로그인</h3>
      <Form className="w-100 mx-5" noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group className="mb-2" controlId="id">
          <Form.Control required type="text" placeholder="사용자 이름" maxLength={20} value={state.id} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-4" controlId="pw">
          <Form.Control required type="password" placeholder="암호" maxLength={20} value={state.pw} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Button className="w-100 center" type="submit">로그인</Button>
        </Form.Group>
      </Form>
      <Link to={"/sign-up"}>계정 만들기</Link>
    </>
  )
}

export default Login
