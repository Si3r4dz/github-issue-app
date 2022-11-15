import axios from 'axios'
import { useQuery } from 'react-query'
import { API_KEY, API_URL } from '../../variable'

import fromApiCallError from '../Adapters/ErrorsApiAdapter'

const getHeaders = (key) => {
    if (key !== '') {
        const authHeaders = {
            'Content-Type': 'application/json',
            Authorization: `Token ${key}`,
        }
        return authHeaders
    }
    const headers = {
        'Content-Type': 'application/json',
    }
    return headers
}

const apiGetData = async (url) => {
    if (url !== null && url !== undefined && url !== '') {
        // eslint-disable-next-line no-console
        return axios.get(`${API_URL}${url}`, { headers: getHeaders(API_KEY) })
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
