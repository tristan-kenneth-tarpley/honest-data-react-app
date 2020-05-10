import React from 'react';

interface props {
    children: React.ReactNode
    justify?: boolean
}

const Card: React.FC<props> = (props) => {
    return (
        <div className={`card ${props.justify ? 'justify' : ''}`}>
            {props.children}
        </div>
    )
}

export default Card;