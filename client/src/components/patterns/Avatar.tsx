import React from 'react';
import './Avatar.scss'

function Avatar(props: { avatarUrl: string; name: string; size: number }) {
  return (
    <img className="avatar" width={props.size} src={props.avatarUrl} alt={props.name} />
  )
}

export default Avatar
