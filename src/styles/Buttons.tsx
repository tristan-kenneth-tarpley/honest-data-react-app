import React from 'react';

interface button {
    id: string
    children: React.ReactNode
}

const ButtonPrimary: React.FC<button> = (props) => {
    return (
        <button id={props.id} className="btn btn-primary">{props.children}</button>
    )
}

const ButtonSecondary: React.FC<button> = (props) => {
    return (
        <button id={props.id} className="btn btn-secondary">{props.children}</button>
    )
}

const ButtonTertiary: React.FC<button> = (props) => {
    return (
        <button id={props.id} className="btn btn-tertiary">{props.children}</button>
    )
}

export {ButtonPrimary, ButtonTertiary, ButtonSecondary}