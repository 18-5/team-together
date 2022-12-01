import React from "react";
import { redirect } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function ProfileEditPage() {
  return (
    <Form>
      <h3>프로필 편집</h3>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>이름</Form.Label>
        <Form.Control type="email" placeholder="이름 받아오는 곳" readOnly />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>유저명</Form.Label>
        <Form.Control type="password" placeholder="유저명 받아오는 곳" readOnly />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>정보</Form.Label>
        <Form.Control as="textarea" rows={3} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default ProfileEditPage;
