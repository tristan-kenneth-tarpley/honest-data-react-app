import React from 'react';

interface button {
    id: string
    children: React.ReactNode
    onClick?: () => void
}

const ButtonPrimary: React.FC<button> = (props) => {
    return (
        <button onClick={props.onClick && props.onClick} id={props.id}
            className="btn btn-primary">
            {props.children}
        </button>
    )
}

const ButtonSecondary: React.FC<button> = (props) => {
    return (
        <button onClick={props.onClick && props.onClick} id={props.id}
                className="btn btn-secondary">
            {props.children}
        </button>
    )
}

const ButtonTertiary: React.FC<button> = (props) => {
    return (
        <button onClick={props.onClick && props.onClick} id={props.id}
                className="btn btn-tertiary">
            {props.children}
        </button>
    )
}

export {ButtonPrimary, ButtonTertiary, ButtonSecondary}