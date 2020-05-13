export default class APIClient {
    baseUrl: string

    constructor(singleOrMulti: string){

        let url;
        if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
            url = 'http://127.0.0.1:5000'
        } else {
            url = 'https://api.honestdata.world'
        }


        let searchType;
        switch(singleOrMulti) {
            case 'single':
                searchType = 'src'
                break
            case 'multi':
                searchType = 'joint'
                break
            default:
                throw new Error()
        }

        this.baseUrl = `${url}/${searchType}`
    }

    async query(src: string, endpoint: string | undefined) {
        let url = `${this.baseUrl}/${src}`
        console.log(url)
        if (endpoint) url += `/${endpoint}`

        const res = await fetch(url)
        const json = await res.json()

        return json
    }
}