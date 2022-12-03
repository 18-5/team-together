import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";

function ProjectEdit() {
  const { projectId } = useParams();
  const [validated, setValidated] = useState(false);
  const [state, setState] = useState({
    id: "",
    name: "",
    description: "",
    status: ""
  });

  useEffect(() => {
    async function ProjectLoader() {
      await axios.get(`/api/projects/${projectId}`)
        .then(function (response) {
          console.log(response.data[0]);
          setState({
            id: response.data[0].projectId,
            name: response.data[0].projectName,
            description: response.data[0].description,
            status: response.data[0].status
          })
        })
        .catch(function (error) {
          console.log(error);
        })
    }
    ProjectLoader()
  }, [])


  const navigate = useNavigate();

  const handleSubmit = (e: { currentTarget: any; preventDefault: () => void; stopPropagation: () => void; }) => {
    const form = e.currentTarget;
    e.preventDefault();
    if (form.checkValidity() === false)
      e.stopPropagation();

    setValidated(true);
    updateProject();
    navigate(-1);
  };

  const handleChange = (e: { target: { id: string; value: string; }; }) => {
    const { id, value } = e.target
    setState(prevState => ({
      ...prevState,
      [id]: value
    }))
  }

  async function updateProject() {
    await axios.put(`/api/projects/${projectId}`, {
      projectName: state.name,
      description: state.description,
      state: "Open"
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
      <h3 className="mb-4">프로젝트 편집</h3>
      <Form className="" noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="id">
          <Form.Label>프로젝트 id</Form.Label>
          <Form.Control required type="text" maxLength={20} value={state.id} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>프로젝트 이름</Form.Label>
          <Form.Control required type="text" maxLength={20} value={state.name} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="description">
          <Form.Label>소개글</Form.Label>
          <Form.Control type="text" maxLength={50} value={state.description} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="status">
          <Form.Label>상태</Form.Label>
          <Form.Control type="text" maxLength={200} value={state.status} onChange={handleChange} />
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Col xs={{ span: 9, offset: 3 }}>
            <Button type="submit">완료</Button>
          </Col>
        </Form.Group>
      </Form>
    </div>
  )

  return <></>
}

export default ProjectEdit
