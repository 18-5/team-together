import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Outlet } from "react-router-dom"
import Navigation from "./common/Navigation";
import "./App.scss"

function App() {
  return (
    <Container className="h-100">
      <Row className="h-100">
        <Col xs={3} className="h-100 overflow-auto" as="header">
          <Navigation />
        </Col>
        <Col xs={9} className="h-100 overflow-scroll" as="main">
          <Outlet />
        </Col>
      </Row>
    </Container>
  );
}

export default App
