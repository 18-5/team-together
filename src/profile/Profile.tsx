import React from "react"
import avatarPlaceholder from '../assets/avatar-placeholder.png'
import Avatar from '../common/Avatar'

function Profile() {
  // The process of loading profile of current session is required.
  const name = "정대용"
  const username = "@daeyongjeong"
  const description = "간단한 자기 소개 글"
  const follower = 153
  const following = 187
  const location = "서울, 대한민국"
  const website = "daeyongjeong.com"
  const email = "daeyong.jeong.18@gmail.com"
  const github = "@daeyongjeong"

  // Should be rewritten as a react-bootstrap component
  return (
    <div className="row align-items-center">
      <div className="col" >
        <div className="hstack py-3">
          <div className="px-3">
            <Avatar avatarUrl={avatarPlaceholder} name="Annonymous" />
          </div>
          <div className="vstack gap-2">
            <div className="vstack">
              <div className="name fs-3">{name}</div>
              <div className="username">{username}</div>
              <div className="description">{description}</div>
              <div className="userid"></div>
            </div>
            <div className="hstack gap-2">
              <div>
                <strong>{follower}</strong> 팔로워
              </div>
              <div>
                <strong>{following}</strong> 팔로잉
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col p-3">
        <div className="location">{location}</div>
        <div className="website">{website}</div>
        <div className="email">{email}</div>
        <div className="github">{github}</div>
      </div>
    </div>
  )
}

export default Profile
