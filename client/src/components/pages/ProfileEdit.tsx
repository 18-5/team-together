import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import DatePicker from 'react-datepicker';

function ProfileEdit() {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [validated, setValidated] = useState(false);
  const [state, setState] = useState({
    id: "",
    name: "",
    pwd: "",
    bio: "",
    email: "",
    homepage: "",
    school: "",
    experiences: "",
    skills: ""
  });
  const [dueDate, setDueDate] = useState(new Date());

  useEffect(() => {
    async function ProfileLoader() {
      await axios.get(`/api/users/${userId}`)
        .then(function (response) {
          setState({
            id: response.data[0].userId,
            name: response.data[0].userName,
            pwd: response.data[0].userPwd,
            bio: response.data[0].userBio,
            email: response.data[0].userEmail,
            homepage: response.data[0].userHomepage,
            school: response.data[0].userSchool,
            experiences: "",
            skills: ""
          })
        })
        .catch(function (error) {
          console.log(error);
        })
    }
    ProfileLoader()
  }, [])

  const handleChange = (e: { target: { id: string; value: string; }; }) => {
    const { id, value } = e.target
    setState(prevState => ({
      ...prevState,
      [id]: value
    }))
  }

  const handleSubmit = (e: { currentTarget: any; preventDefault: () => void; stopPropagation: () => void; }) => {
    const form = e.currentTarget;
    e.preventDefault();
    if (form.checkValidity() === false)
      e.stopPropagation();
    setValidated(true);
    updateUser();
    navigate(-1);
  };

  async function updateUser() {
    await axios.put(`/api/users/${userId}`, {
      userBio: state.bio,
      userEmail: state.email,
      userHomepage: state.homepage,
      userSchool: state.school
    })
      .then(function (response) {
        console.log(response.data);
        alert(response.data);
      })
      .catch(function (error) {
        console.log(error);
        alert(error);
      })
  }

  return (
    <div className="py-4">
      <Link to={"/"} className="mb-4">
      </Link>
      <h1 className="h3 mb-4">프로필 편집</h1>
      <Form className="" noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>이름</Form.Label>
          <Form.Control required type="text" maxLength={20} value={state.name || ""} disabled />
        </Form.Group>
        <Form.Group className="mb-5" controlId="bio">
          <Form.Label>소개</Form.Label>
          <Form.Control type="text" maxLength={50} value={state.bio || ""} onChange={handleChange} />
          <Form.Text className="text-muted">
            나를 나타내는 소개글입니다.
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>이메일</Form.Label>
          <Form.Control type="email" maxLength={200} value={state.email || ""} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="homepage">
          <Form.Label>홈페이지</Form.Label>
          <Form.Control type="url" maxLength={100} value={state.homepage || ""} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-5" controlId="school">
          <Form.Label>학교</Form.Label>
          <Form.Control type="email" maxLength={200} value={state.school || ""} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Button className="me-2" variant="secondary">취소</Button>
          <Button type="submit">완료</Button>
        </Form.Group>
      </Form>
    </div>
  )

  return <></>
}

export default ProfileEdit
