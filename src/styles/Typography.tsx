import React from 'react'

interface text {
    size: string
    len: string
}

const Text: React.FC<text> = (props) => {
    let _class: string | undefined;
    if (props.size === 'sm' && props.len === 'short') _class = 'body-short-1'
    else if (props.size === 'sm' && props.len === 'long') _class = 'body-long-1'
    else if (props.size === 'lg' && props.len === 'short') _class = 'body-short-2'
    else if (props.size === 'lg' && props.len === 'long') _class = 'body-long-2'

    return (
        <p className={_class}>{props.children}</p>
    )
}

const Helper: React.FC<{children: React.ReactNode}> = (props) => {
    return (
        <p className='helper'>{props.children}</p>
    )
}

export {Text, Helper}