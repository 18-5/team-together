import React from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Stack from 'react-bootstrap/Stack';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Projects from '../project/Projects';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

function FeedPage() {
  return (
    <div className="py-3">
      <Form>
        <Row>
          <Col>
            <Form.Select aria-label="Default select example">
              <option value="1">추천순</option>
              <option value="2">어쩌구</option>
              <option value="3">저쩌구</option>
            </Form.Select>
          </Col>
          <Col>
            <Form.Check
              type="switch"
              id="custom-switch"
              label="모집 중만 보기"
            />
          </Col>
        </Row>
      </Form>
      <Projects />
    </div>
  )
}

export default FeedPage
