import React from 'react';
import './Avatar.scss'

function Avatar(props: { avatarUrl: string | undefined; name: string | undefined; }) {
    return (
        <img className="avatar" src={props.avatarUrl} alt={props.name} />
    )
}

export default Avatar
