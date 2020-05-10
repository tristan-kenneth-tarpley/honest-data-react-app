import React from 'react'
import Select from 'react-select'

interface toolbar {
    title: string
    filterables: Array<any>
    source: string
    description: string
}

const Toolbar: React.FC<toolbar> = (props) => {

    return (
        <div className="dashboard__toolbar">
            <div className="info">
                <h5>{props.title}</h5>
                <p>{props.description}</p>
                <a target="__blank" href={props.source}>
                    source
                </a>
            </div>
            <Select
                id="select"
                defaultValue={props.filterables[0]}
                isMulti
                name="colors"
                options={props.filterables}
                className="basic-multi-select"
                classNamePrefix="select"
            />
        </div>
    )
}

export default Toolbar