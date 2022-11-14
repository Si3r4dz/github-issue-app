const fromApiCallError = (errObj) => {
    if (errObj.response.status === 401) {
        return { error: 'Auth error' }
    }
    return { error: 'Server error' }
}
export default (fromApiCallError)
