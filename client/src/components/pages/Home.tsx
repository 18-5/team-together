import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

function FeedPage() {
  // 데이터 로딩
  const [data, setData] = useState<any>();
  useEffect(() => {
    async function ProjectsLoader() {
      await axios.get('/api/projects')
        .then(function (response) {
          console.dir(response.data);
          setData(response.data);
        })
        .catch(function (error) {
          console.log(error);
        })
    }
    ProjectsLoader()
  }, [])

  function AllProjects() {
    if (data)
      return (<>
        {data.map((project, index) => (
          <div key={index}>
            <Link to={`projects/${project.projectId}`}>
              <h4>{project.projectName}</h4>
            </Link>
            <p>{project.description}</p>
          </div>

        ))
        }
      </>
      )
    else return <></>
  }

  return (
    <div className="py-4">
      <div className="mb-3">
        <Link to="/projects/new">
          <Button>새 프로젝트</Button>
        </Link>
      </div>
      <Form>
        <Form.Select aria-label="Default select example">
          <option value="1">추천순</option>
          <option value="2">어쩌구</option>
          <option value="3">저쩌구</option>
        </Form.Select>
        <Form.Check
          type="switch"
          id="custom-switch"
          label="모집 중만 보기"
        />
      </Form>
      <AllProjects />
    </div>
  )
}

export default FeedPage
