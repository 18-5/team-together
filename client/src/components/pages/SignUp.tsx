import React, { useState } from "react"
import axios from "axios";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import Logo from "../../assets/logo.svg"
import { Link, useNavigate } from "react-router-dom";

function SignUp() {
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
  const navigate = useNavigate();

  const handleSubmit = (e: { currentTarget: any; preventDefault: () => void; stopPropagation: () => void; }) => {
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    setValidated(true);
    createUser();
  };

  const handleChange = (e: { target: { id: string; value: string; }; }) => {
    const { id, value } = e.target
    setState(prevState => ({
      ...prevState,
      [id]: value
    }))
  }

  async function createUser() {
    await axios.post("/api/users", {
      userId: state.userId,
      userPwd: state.userPwd,
      userName: state.userName,
      userEmail: state.userEmail,
      userHomepage: state.userHomepage,
      userSchool: state.userSchool,
      userBio: state.userBio
    })
      .then((res) => {
        console.log(res)
        if (res.data) {
          console.log("sign up success")
          alert("계정이 생성되었습니다.")
          navigate("/login")
        } else {
          alert("계정 생성 중 문제가 발생했습니다.");
        }
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      })
  }

  // TODO: 서버에서 데이터 받아와서 중복 체크하기

  return (
    <>
      <Link to={"/"} className="mb-4">
        <img width="80" src={Logo} alt="Team Together" />
      </Link>
      <h3 className="mb-4">계정 만들기</h3>
      <Form className="w-100 mx-5" noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group as={Row} className="mb-2" controlId="userId">
          <Form.Label column xs={3}>사용자 이름</Form.Label>
          <Col xs={9}>
            <Form.Control required type="text" placeholder="사용자 이름" maxLength={20} value={state.userId} onChange={handleChange} />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-4" controlId="userPwd">
          <Form.Label column xs={3}>암호</Form.Label>
          <Col xs={9}>
            <Form.Control required type="password" placeholder="암호" maxLength={20} value={state.userPwd} onChange={handleChange} />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Col xs={{ span: 9, offset: 3 }}>
            <Button type="submit">완료</Button>
          </Col>
        </Form.Group>
      </Form>
    </>
  )
}

export default SignUp
