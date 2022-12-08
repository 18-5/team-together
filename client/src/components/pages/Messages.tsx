import axios from "axios";
import React, { useEffect, useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { useCookies } from "react-cookie";
import { Link, useParams } from "react-router-dom";

function Messages() {
  const { userId } = useParams();
  const [cookie] = useCookies(["user"]);
  const [data, setData] = useState<any>();
  useEffect(() => {
    async function MessagesLoader() {
      await axios.get(`/api/message/${cookie.user}/messages/all`)
        .then(function (response) {
          console.log(response.data);
          setData(response.data);
        })
        .catch(function (error) {
          console.log(error);
        })
    }
    MessagesLoader()
  }, [])

  async function GetUserName(userId: string) {
    await axios.get(`/users/${userId}`)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  if (!data)
    return (
      <div className="tile">
        <div className="d-flex justify-content-between mb-3">
          <h1 className="fluid-heading-04">받은 메시지함</h1>
          <Link to="/messages/new">
            <Button variant="primary">쪽지 작성하기</Button>
          </Link>
        </div>
        받은 메시지가 없습니다.
      </div>
    )

  return (
    <div className="tile">
      <div className="d-flex justify-content-between mb-3">
        <h1 className="fluid-heading-04">받은 메시지함</h1>
        <Link to="/messages/new">
          <Button variant="primary" className="center">쪽지 작성하기</Button>
        </Link>
      </div>
      {data.map((message: any, index: number) => (
        <div className="tile-02" key={index}>
          <Row className="mb-1">
            <Col xs={2}>
              보낸 사람
            </Col>
            <Col>
              <Link to={`/profile/${message.senderId}`}>
                {message.senderId}
              </Link>
            </Col>
          </Row>
          <Row>
            <Col xs={2}>
              내용
            </Col>
            <Col>
              <div className="mb-1 text-body">{message.content}</div>
            </Col>
          </Row>
        </div>
      ))
      }
    </div>
  )
}

export default Messages
