import React from "react";
import { Outlet, Link, NavLink } from "react-router-dom"
import Logo from "./assets/logo.svg"
import "./App.scss"
import { Nav, Container, Row, Col } from "react-bootstrap";
import Navigation from "./common/Navigation";

function App() {
  return (
    <Container className="h-100">
      <Row className="h-100">
        <Col xs={4} className="h-100 overflow-auto" as="header">
          <Navigation />
        </Col>
        <Col xs={8} className="h-100 overflow-scroll" as="main">
          <Outlet />
        </Col>
      </Row>
    </Container>
  );
}

export default App
