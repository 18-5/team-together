import React from "react"
import avatarPlaceholder from '../assets/avatar-placeholder.png'
import Avatar from '../common/Avatar'
import Stack from 'react-bootstrap/Stack';
import ProfileData from './ProfileInterface';
import axios from "axios";

export async function getProfile(userid: string) {
  await axios.get('/api/users/' + userid)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    })
}

function Profile(props: { profileData: ProfileData }) {
  // The process of loading profile of current session is required.

  // Should be rewritten as a react-bootstrap component
  return (
    <div className="row align-items-center">
      <Stack gap={3}>
        <Stack direction="horizontal">
          <Avatar avatarUrl={avatarPlaceholder} name={props.profileData.name} />
          <Stack>
            <div className="name fs-3">{props.profileData.name}</div>
            <div className="username">{props.profileData.username}</div>
            <div className="description">{props.profileData.description}</div>
            <div className="userid"></div>
            <Stack direction="horizontal" gap={2}>
              <div><strong>{props.profileData.follower}</strong> 팔로워</div>
              <div>
                <strong>{props.profileData.following}</strong> 팔로잉
              </div>
            </Stack>
          </Stack>
        </Stack>
        <div className="col p-3">
          <div className="location">{props.profileData.location}</div>
          <div className="website">{props.profileData.website}</div>
          <div className="email">{props.profileData.email}</div>
          <div className="github">{props.profileData.github}</div>
        </div>
      </Stack>
    </div >
  )
}

export default Profile
