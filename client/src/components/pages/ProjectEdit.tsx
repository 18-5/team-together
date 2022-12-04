import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import DatePicker from 'react-datepicker';

function ProjectEdit() {
  const { projectId } = useParams();
  const [validated, setValidated] = useState(false);
  const [state, setState] = useState({
    id: "",
    name: "",
    description: "",
    status: "",
    readme: "",
    post: "",
    intake: "",
    tag: ""
  });
  const [dueDate, setDueDate] = useState(new Date());

  useEffect(() => {
    async function ProjectLoader() {
      await axios.get(`/api/projects/${projectId}`)
        .then(function (response) {
          console.log(response.data[0]);
          setState({
            id: response.data[0].projectId,
            name: response.data[0].projectName,
            description: response.data[0].description,
            status: response.data[0].status,
            readme: response.data[0].readme,
            post: response.data[0].post,
            intake: response.data[0].intake,
            tag: response.data[0].tag
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
      <h1 className="h3 mb-4">새 프로젝트</h1>
      <Form className="" noValidate validated={validated} onSubmit={handleSubmit}>
        <h2 className="h4 mb-3">필수 정보</h2>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>프로젝트 이름</Form.Label>
          <Form.Control required type="text" maxLength={20} value={state.name} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="description">
          <Form.Label>프로젝트 주제</Form.Label>
          <Form.Control type="text" maxLength={50} value={state.description} onChange={handleChange} />
          <Form.Text className="text-muted">
            프로젝트 주제를 잘 나타내는 한줄 소개글입니다.
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-5" controlId="post">
          <Form.Label>게시글</Form.Label>
          <Form.Control type="text" maxLength={50} value={state.post} onChange={handleChange} />
          <Form.Text className="text-muted">
            프로젝트가 모집 중일때 다른 사람들에게 보여지는 게시글입니다.
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="intake">
          <Form.Label>모집 정원</Form.Label>
          <Form.Control className="w-25" type="text" maxLength={4} value={state.intake} placeholder={"2"} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-5" controlId="duedate">
          <Form.Label>모집 기한</Form.Label>
          <DatePicker className="datepicker-control" selected={dueDate} onChange={(date: Date) => setDueDate(date)} />
        </Form.Group>
        <h2 className="h4 mb-3">선택 정보</h2>
        <Form.Group className="mb-3" controlId="readme">
          <Form.Label>프로젝트 상세</Form.Label>
          <Form.Control type="text" maxLength={200} value={state.readme} onChange={handleChange} />
          <Form.Text className="text-muted">
            프로젝트 상세 페이지에서 확인할 수 있는 더 자세한 소개글입니다.
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-5" controlId="tag">
          <Form.Label>태그</Form.Label>
          <Form.Control className="w-25" type="text" maxLength={100} value={state.tag} placeholder={"태그1, 태그2"} onChange={handleChange} />
          <Form.Text className="text-muted">
            프로젝트 태그를 쉼표로 구분해서 입력해주세요.
          </Form.Text>
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

export default ProjectEdit
