import axios from 'axios'
import { useQuery } from 'react-query'
import fromApiCallError from '../Adapters/ErrorsApiAdapter'

const apiUrl = 'https://api.github.com'
const apiKey = ''

const headers = (key) => {
    const authHeaders = {
        'Content-Type': 'application/json',
        Authorization: `Token ${key}`,
    }
    return authHeaders
}

const apiGetData = async (url) => {
    if (url !== null && url !== undefined && url !== '') {
        // eslint-disable-next-line no-console
        return axios.get(`${apiUrl}${url}`, { headers: headers(apiKey) })
    }
    return null
}

const useApi = ({
    url = '',
    queryName = '',
    fromApiAdapter = () => {},
    fromApiErrorAdapter = fromApiCallError,
    keepPreviousData = false,
}) => useQuery(queryName, () => apiGetData(url), {
    onError: fromApiErrorAdapter,
    keepPreviousData,
    select: (apiObj) => fromApiAdapter(apiObj),
})

export default useApi
