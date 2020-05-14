
import {decamelize} from '../helpers'
import {filterable} from '../types'

export const getFilterables = (data: any) => {
    let filterables: Array<filterable> = [];

    for (let i of Object.keys(data.records[0])) {
        const root = data.records[0]
        const disallowedKeys = ["internal", "flag"]
        if (i !== "uid" && !disallowedKeys.includes(root[i])) {
            filterables = [...filterables, {
                value: i,
                label: decamelize(i)
            }]
        }
    }

    return filterables
}