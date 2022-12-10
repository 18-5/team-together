import React, { useEffect, useState } from "react";
import { PlusIcon } from "@primer/octicons-react";
import axios from "axios";
import { Button, Stack } from "react-bootstrap";
import { useCookies } from "react-cookie";
import { Link, useParams } from "react-router-dom";
import avatarPlaceholder from '../../assets/avatar-placeholder.png';
import Avatar from "../patterns/Avatar";

function MessageDetail() {
  const { userId, senderId } = useParams();
  const [cookie] = useCookies(["user"]);
  const [data, setData] = useState<any>();
  useEffect(() => { MessagesLoader() }, [])

  async function MessagesLoader() {
    await axios.get(`/api/message/${cookie.user}/messages/${senderId}`)
      .then(function (response) {
        setData(response.data);
      })
  }

  if (!data)
    return (
      <>
        <div className="tile-01">
          <div className="d-flex justify-content-between align-items-end mb-3">
            <h1 className="fluid-heading-04">받은 메시지함</h1>
            <Link to={`/messages/new/${senderId}`}>
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
          <h1 className="fluid-heading-04">{senderId}</h1>
          <Link to={`/messages/new/${senderId}`}>
            <Button variant="link" className="center">새 쪽지<PlusIcon className="ml-03" /></Button>
          </Link>
        </div>
      </div>
      {data.map((message: any, index: number) => (
        message.senderId == cookie.user ?
          <div className="tile-02" key={index}>
            <div className="text-end">
              <h2 className="body-02 text-body">{message.senderId}</h2>
              <div className="body-01 text-body mb-05">{message.content}</div>
              <div className="label-01 text-helper">
                {message.createdAt.charAt(0) > 0 ? new Intl.DateTimeFormat('ko-kr').format(new Date(Date.parse(message.createdAt))) : null}
              </div>
            </div>
          </div>
          :
          <div className="tile-02" key={index}>
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
      ))
      }
    </>
  )
}

export default MessageDetail
