import userApi from './users'
import homesApi from './homes'

export default (algoliaConfig) => {
    return {
        user: userApi(algoliaConfig),
        homes: homesApi(algoliaConfig),
    }
}