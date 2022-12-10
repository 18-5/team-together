import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Form } from "react-bootstrap";
import { useCookies } from "react-cookie";
import DatePicker from 'react-datepicker';
import { useNavigate, useParams } from "react-router-dom";

function ProjectEdit(props: { isNewProject: boolean }) {
  const [cookie] = useCookies(["user"]);
  const { projectId } = useParams();
  const navigate = useNavigate();

  // Fetch data
  const [value, setValue] = useState({
    id: "",
    name: "",
    description: "",
    readme: "",
    post: "",
    intake: undefined,
    tags: "",
  });
  const [dueDate, setDueDate] = useState(new Date())
  const [status, setStatus] = useState(0);

  async function ProjectLoader() {
    await axios.get(`/api/projects/${projectId}`)
      .then((response) => {
        const data = response.data[0];
        console.log(data)
        setValue({
          id: data.projectId,
          name: data.projectName,
          description: data.description,
          readme: data.readMe,
          post: data.post,
          intake: data.intake,
          tags: data.tags
        })
        console.log(data.duedate);
        setDueDate(new Date(Date.parse(data.duedate)))
        console.log(data.projectState)
        setStatus(data.projectState)
      })
  }

  useEffect(() => { if (projectId) ProjectLoader() }, [])

  // Validation
  const [validated, setValidated] = useState(false);

  const handleChange = (e: {
    target: {
      id: string; value: string;
    };
  }) => {
    const { id, value } = e.target
    setValue(prevState => ({
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
    if (props.isNewProject)
      createProject();
    else
      updateProject();
    navigate(-1);
  };

  async function createProject() {
    const d = dueDate;
    d.setTime(d.getTime() + 86400000);

    await axios.post(`/api/projects`, {
      leaderid: cookie.user,
      projectName: value.name,
      description: value.description,
      post: value.post,
      intake: value.intake,
      status: status,
      duedate: d.toISOString().slice(0, 10),
      readme: value.readme,
    })
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  async function updateProject() {
    const d = dueDate;
    d.setTime(d.getTime() + 86400000);

    await axios.put(`/api/projects/${projectId}`, {
      projectName: value.name,
      description: value.description,
      post: value.post,
      intake: value.intake,
      status: status,
      duedate: d.toISOString().slice(0, 10),
      readme: value.readme,
    })
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  return (
    <div>
      <div className="tile-03">
        <h1 className="fluid-heading-04 mb-07">{props.isNewProject ? "새 프로젝트" : "프로젝트 편집"}</h1>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <h2 className="fluid-heading-03 mb-07">필수 정보</h2>
          <Form.Group className="mb-07" controlId="name">
            <Form.Label>프로젝트 이름</Form.Label>
            <Form.Control required type="text" maxLength={20} value={value.name || ""} onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mb-07" controlId="description">
            <Form.Label>프로젝트 주제</Form.Label>
            <Form.Control type="text" maxLength={50} value={value.description || ""} onChange={handleChange} />
            <Form.Text>프로젝트 주제를 잘 나타내는 한줄 소개글입니다.</Form.Text>
          </Form.Group>

          <Form.Group className="mb-07" controlId="post">
            <Form.Label>게시글</Form.Label>
            <Form.Control type="text" maxLength={50} value={value.post || ""} onChange={handleChange} />
            <Form.Text>프로젝트가 모집 중일때 다른 사람들에게 보여지는 게시글입니다.</Form.Text>
          </Form.Group>

          <Form.Group className="mb-07" controlId="intake">
            <Form.Label>모집 정원</Form.Label>
            <Form.Control className="w-25" type="text" maxLength={4} value={value.intake} placeholder={"2"} onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mb-07" controlId="dueDate">
            <Form.Label>모집 기한</Form.Label>
            <DatePicker className="datepicker-control" selected={dueDate} onChange={(dueDate: Date) => setDueDate(dueDate)} dateFormat="yyyy/MM/dd" />
          </Form.Group>

          <Form.Group className="mb-09" controlId="status">
            <Form.Label>프로젝트 진행 상태</Form.Label>
            <div>
              <Form.Check inline label="모집 중" name="status" type="radio" id="0" checked={status == 0} value={0} onChange={() => setStatus(0)} />
              <Form.Check inline label="프로젝트 진행 중" name="status" type="radio" id="2" checked={status == 2} value={2} onChange={() => setStatus(2)} />
              <Form.Check inline label="프로젝트 완료" name="status" type="radio" id="3" checked={status == 3} value={3} onChange={() => setStatus(3)} />
            </div>
          </Form.Group>

          <h2 className="fluid-heading-03 mb-07">선택 정보</h2>
          <Form.Group className="mb-07" controlId="readme">
            <Form.Label>프로젝트 상세</Form.Label>
            <Form.Control type="text" maxLength={500} value={value.readme || ""} onChange={handleChange} />
            <Form.Text className="text-muted">
              프로젝트 상세 페이지에서 확인할 수 있는 더 자세한 소개글입니다.
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-07" controlId="tag">
            <Form.Label>태그</Form.Label>
            <Form.Control className="w-25" type="text" maxLength={100} value={value.tags || ""} placeholder={"태그1, 태그2"} onChange={handleChange} />
            <Form.Text className="text-muted">
              프로젝트 태그를 쉼표로 구분해서 입력해주세요.
            </Form.Text>
          </Form.Group>



          <Form.Group>
            <Button className="me-2" variant="secondary" onClick={() => navigate(-1)}>취소</Button>
            <Button type="submit">완료</Button>
          </Form.Group>

        </Form>
      </div>
    </div >
  )
}

export default ProjectEdit
