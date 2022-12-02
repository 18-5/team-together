import React from 'react';
import './Avatar.scss'

function Avatar(props: { avatarUrl: string; name: string; }) {
  return (
    <div className='px-3'>
      <img className="avatar" src={props.avatarUrl} alt={props.name} />
    </div>
  )
}

export default Avatar
