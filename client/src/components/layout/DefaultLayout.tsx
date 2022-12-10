import React from "react";

import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

function DefaultLayout() {
  return (
    <Container fluid className="h-100">
      <Row className="h-100">
        <Col className="h-100 overflow-auto border-end panel" as="header">
          <Sidebar />
        </Col>
        <Col className="h-100 overflow-auto bg" as="main">
          <Row>
            <Col xl={{ span: 10, offset: 1 }} xxl={{ span: 8, offset: 2 }}>
              <Outlet />
            </Col>
          </Row>
        </Col>
      </Row >
    </Container >
  );
}

export default DefaultLayout

