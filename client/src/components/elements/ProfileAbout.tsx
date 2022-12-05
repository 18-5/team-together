import React from "react"
import { Col, Row, Stack } from "react-bootstrap"
import Avatar from "./Avatar"
import avatarPlaceholder from '../../assets/avatar-placeholder.png'

function ProfileAbout(props: any) {
  console.log(props)
  return (
    <Row className="mb-3 align-items-center">
      <Col>
        <Stack direction="horizontal" className="gap-3">
          <Avatar avatarUrl={avatarPlaceholder} name={props.profileData.userName} />
          <div>
            <div className="h3">{props.profileData.userName}</div>
            <div>{props.profileData.userBio}</div>
            <div>{props.profileData.userId}</div>
          </div>
        </Stack>
      </Col>
      <Col>
        <div>{props.profileData.location || "로케"}</div>
        <div>{props.profileData.homepage || "홈페"}</div>
        <div>{props.profileData.email}</div>
        <div>{props.profileData.github}</div>
      </Col>
    </Row>
  )
}

export default ProfileAbout
