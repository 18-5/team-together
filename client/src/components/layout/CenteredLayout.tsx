import React from "react";

import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { Outlet } from "react-router-dom";

function CenteredLayout() {
  return (
    <Container className="h-100">
      <Row className="align-items-center justify-content-center h-100">
        <Col xs={"auto"} className="d-flex flex-column align-items-center shadow border rounded-3 p-5 layer-1">
          <Outlet />
        </Col>
      </Row>
    </Container>
  )
}

export default CenteredLayout
