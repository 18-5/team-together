import React from "react";
import Stack from "react-bootstrap/Stack";
import Badge from 'react-bootstrap/Badge';
import { Col, Container, Row } from "react-bootstrap";
import ReviewInterface from "./ReviewInterface";

function ReviewSection(reviews: [ReviewInterface]) {
  return (
    <div>
      <Stack gap={5}>
        {reviews.map((review, index) => (
          <ProjectEntry data={project} key={index} />
        ))}
      </Stack>
    </div>
  )
}

export default Review
