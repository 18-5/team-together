import axios from "axios";
import React, { useEffect, useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { useCookies } from "react-cookie";
import { Link, useParams } from "react-router-dom";



function Notifications() {
  const { userId } = useParams();
  const [cookie] = useCookies(["user"]);
  const [data, setData] = useState<any>();
  useEffect(() => {
    async function MessagesLoader() {
      await axios.get(`/api/notification/${cookie.user}/notifications`)
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
      <div className="py-4">
        <h1 className="h3">알림함</h1>
        받은 메시지가 없습니다.
      </div >
    )

  return (
    <div className="py-4">
      <h1 className="h3 mb-3">알림함</h1>
      {data.map((message: any, index: number) => (
        <div className="py-4 border-bottom" key={index}>
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

export default Notifications
