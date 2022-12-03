import React, { useState } from "react";
import axios from "axios";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

function ProjectEdit() {
  const [validated, setValidated] = useState(false);
  const [state, setState] = useState({
    id: "",
    name: "",
    description: "",
    status: "",
    readme: ""
  });
  const navigate = useNavigate();

  const handleSubmit = (e: { currentTarget: any; preventDefault: () => void; stopPropagation: () => void; }) => {
    const form = e.currentTarget;
    e.preventDefault();
    if (form.checkValidity() === false)
      e.stopPropagation();

    setValidated(true);
    createProject();
    navigate(-1);
  };

  const handleChange = (e: { target: { id: string; value: string; }; }) => {
    const { id, value } = e.target
    setState(prevState => ({
      ...prevState,
      [id]: value
    }))
  }

  async function createProject() {
    await axios.post(`/api/projects/`, {
      projectId: 3, // TODO: 여기 API에서 삭제되면 지우기
      projectName: state.name,
      description: state.description,
      readme: state.readme
    })
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  return (
    <div className="py-4">
      <Link to={"/"} className="mb-4">
      </Link>
      <h3 className="mb-4">새 프로젝트</h3>
      <Form className="" noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>프로젝트 이름</Form.Label>
          <Form.Control required type="text" maxLength={20} value={state.name} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="description">
          <Form.Label>소개글</Form.Label>
          <Form.Control type="text" maxLength={50} value={state.description} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="readme">
          <Form.Label>README</Form.Label>
          <Form.Control type="text" maxLength={200} value={state.readme} onChange={handleChange} />
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Col xs={{ span: 9, offset: 3 }}>
            <Button type="submit">완료</Button>
          </Col>
        </Form.Group>
      </Form>
    </div>
  )
}

export default ProjectEdit
