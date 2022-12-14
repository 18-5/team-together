import React, { useEffect, useState } from "react";
import { PlusIcon } from "@primer/octicons-react";
import axios from "axios";
import { Button, Stack } from "react-bootstrap";
import { useCookies } from "react-cookie";
import { Link, useParams } from "react-router-dom";
import avatarPlaceholder from '../../assets/avatar-placeholder.png';
import Avatar from "../patterns/Avatar";

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

  function RenderMessage() {
    if (!data)
      return <div className="tile-02">쪽지가 없습니다.</div>

    return data.map((message: any, index: number) => (
      message.senderId != cookie.user ?
        <Link to={`/messages/from/${message.senderId}`} key={index}>
          <div className="tile-02">
            <Stack direction="horizontal" className="gap-3">
              <Avatar size={64} avatarUrl={avatarPlaceholder} name={message.senderId} />
              <div>
                <h2 className="body-02 text-body">{message.senderId}</h2>
                <div className="body-01 text-body mb-05">{message.content}</div>
                <div className="label-01 text-helper">
                  {message.createdAt.charAt(0) > 0 ? new Intl.DateTimeFormat('ko-kr').format(new Date(Date.parse(message.createdAt))) : null}
                </div>
              </div>
            </Stack>
          </div>
        </Link>

        :

        !data.find((element: { senderId: any; }) => (element.senderId == message.receiverId)) &&
        <Link to={`/messages/from/${message.receiverId}`} key={index}>
          <div className="tile-02">
            <Stack direction="horizontal" className="gap-3">
              <Avatar size={64} avatarUrl={avatarPlaceholder} name={message.receiverId} />
              <div>
                <h2 className="body-02 text-body">{message.receiverId}</h2>
                <div className="body-01 text-body mb-05">{message.content}</div>
                <div className="label-01 text-helper">
                  {message.createdAt.charAt(0) > 0 ? new Intl.DateTimeFormat('ko-kr').format(new Date(Date.parse(message.createdAt))) : null}
                </div>
              </div>
            </Stack>
          </div>
        </Link>
    ))
  }

  return (
    <>
      <div className="tile-01">
        <div className="d-flex justify-content-between align-items-end mb-3">
          <h1 className="fluid-heading-04">쪽지함</h1>
          <Link to="/messages/new">
            <Button variant="link" className="center">새 쪽지<PlusIcon className="ml-03" /></Button>
          </Link>
        </div>
      </div>
      <RenderMessage />
    </>
  )
}

export default Messages
