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
    id: "",
    pw: "",
    name: "",
    email: ""
  });
  const navigate = useNavigate();

  const handleSubmit = (e: { currentTarget: any; preventDefault: () => void; stopPropagation: () => void; }) => {
    const form = e.currentTarget;
    e.preventDefault();
    if (form.checkValidity() === false)
      e.stopPropagation();

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
      userId: state.id,
      userPW: state.pw,
      userName: state.name,
      userEmail: state.email,
      userHomepage: null,
      userSchool: null,
      userBio: null
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
        <img src={Logo} alt="Team Together" />
      </Link>
      <h3 className="mb-4">계정 만들기</h3>
      <Form className="w-100 mx-5" noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="id">
          <Form.Label>아이디
          </Form.Label>
          <Form.Control required type="text" maxLength={20} value={state.id} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="pw">
          <Form.Label>비밀번호</Form.Label>
          <Form.Control required type="password" maxLength={20} value={state.pw} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>이름</Form.Label>
          <Form.Control type="text" maxLength={50} value={state.name} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>이메일 (선택)</Form.Label>
          <Form.Control type="email" maxLength={200} value={state.email} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
            <Button type="submit">완료</Button>
        </Form.Group>
      </Form>
    </>
  )
}

export default SignUp
