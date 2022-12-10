import React, { useEffect, useState } from "react";
import { PlusIcon } from "@primer/octicons-react";
import axios from "axios";
import { Button } from "react-bootstrap";
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
      <>
        <div className="tile-01">
          <div className="d-flex justify-content-between align-items-end mb-3">
            <h1 className="fluid-heading-04">알림함</h1>
            <Link to="/messages/new">
              <Button variant="link" className="center">새 쪽지<PlusIcon className="ml-03" /></Button>
            </Link>
          </div>
        </div>
        <div className="tile-02">
          받은 메시지가 없습니다.
        </div>
      </>
    )

  return (
    <>
      <div className="tile-01">
        <div className="d-flex justify-content-between align-items-end mb-3">
          <h1 className="fluid-heading-04">알림함</h1>
          <Link to="/messages/new">
            <Button variant="link" className="center">새 쪽지<PlusIcon className="ml-03" /></Button>
          </Link>
        </div>
      </div>
      {data.map((message: any, index: number) => (
        <div className="tile-02" key={index}>
          <h2 className="body-02 text-body">{message.content}</h2>
          <div className="label-01 text-helper">{message.createdAt}</div>
        </div>
      ))
      }
    </>
  )
}

export default Notifications
