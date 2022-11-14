const calculateDate = (date) => {
    const lastUpdateDate = new Date(date)
    const now = new Date()
    const difference = now.getTime() - lastUpdateDate.getTime()
    const result = Math.ceil(difference / (1000 * 3600 * 24))
    return result
}
export default (calculateDate)
