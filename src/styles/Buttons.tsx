import React from 'react';

interface button {
    id: string
    children: React.ReactNode
    onClick?: () => void
    disabled?: boolean
}

const ButtonPrimary: React.FC<button> = (props) => {
    console.log(props.disabled)
    return (
        <button onClick={props.onClick && props.onClick}
                id={props.id}
                className={`btn btn-primary ${props.disabled ? 'disabled' : ''}`}>
            {props.children}
        </button>
    )
}

const ButtonSecondary: React.FC<button> = (props) => {
    return (
        <button disabled={props.disabled}
                onClick={props.onClick && props.onClick}
                id={props.id}
                className={`btn btn-secondary ${props.disabled ? 'disabled' : ''}`}>
            {props.children}
        </button>
    )
}

const ButtonTertiary: React.FC<button> = (props) => {
    return (
        <button disabled={props.disabled}
                onClick={props.onClick && props.onClick}
                id={props.id}
                className={`btn btn-tertiary ${props.disabled ? 'disabled' : ''}`}>
            {props.children}
        </button>
    )
}

export {ButtonPrimary, ButtonTertiary, ButtonSecondary}