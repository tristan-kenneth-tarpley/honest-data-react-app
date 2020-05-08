const toggleSearchType = (_type: number) => {
    return ({
        type: "TOGGLE_TYPE",
        payload: _type
    })
}

export {toggleSearchType}