import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ProjectList from '../elements/ProjectList';

function Home() {
  const [APIURL, setAPIURL] = useState("/api/projects?view=newest");
  const handleChange = (e: { target: { value: string; }; }) => {
    setAPIURL(`/api/projects?view=${e.target.value}`); // TODO props 바뀌었을때 재렌더링하기
  }

  return (
    <div className="py-4">
      <div className="d-flex justify-content-end mb-4 gap-2">
        <Button variant="outline-primary" onClick={() => { return }}>딱 맞는 프로젝트 발견하기</Button>
        <Link to="/projects/new">
          <Button variant="primary">모집 글 작성하기</Button>
        </Link>
      </div>
      <Form className="d-flex justify-content-between align-items-center">
        <Form.Select onChange={handleChange}>
          <option value="newest">최신순</option>
          <option value="timesensitive">마감 임박순</option>
        </Form.Select>
        <Form.Check
          type="switch"
          id="custom-switch"
          label="모집 중만 보기"
          onChange={handleChange}
        />
      </Form>
      <ProjectList APIURL={APIURL} />
    </div>
  )
}

export default Home
