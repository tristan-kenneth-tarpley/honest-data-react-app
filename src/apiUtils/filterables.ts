import {decamelize} from '../helpers'
import {filterable} from '../types'

export const getFilterables = (recordKeys: any): Array<filterable> => {
    let filterables: Array<filterable> = [];

    for (let i of recordKeys) {
        const disallowedKeys = ["internal", "flag"]
        if (i !== "uid" && !disallowedKeys.includes(i)) {
            filterables = [...filterables, {
                value: i,
                label: decamelize(i)
            }]
        }
    }

    return filterables
}