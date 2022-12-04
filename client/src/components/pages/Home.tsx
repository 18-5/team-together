import React from 'react';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ProjectList from '../elements/ProjectList';

function Home() {
  // TODO: option value => project list conditional rendering

  return (
    <div className="py-4">
      <div className="d-flex justify-content-end mb-4 gap-2">
        <Link to="/projects/new">
          <Button variant="outline-primary">딱 맞는 프로젝트 발견하기</Button>
        </Link>
        <Link to="/projects/new">
          <Button variant="primary">모집 글 작성하기</Button>
        </Link>
      </div>
      <Form className="d-flex justify-content-between align-items-center">
        <Form.Select>
          <option value="1">최신순</option>
          <option value="2">추천순</option>
          <option value="2">마감임박순</option>
        </Form.Select>
        <Form.Check
          type="switch"
          id="custom-switch"
          label="모집 중만 보기"
        />
      </Form>
      <ProjectList APIURL="/api/projects" />
    </div>
  )
}

export default Home
