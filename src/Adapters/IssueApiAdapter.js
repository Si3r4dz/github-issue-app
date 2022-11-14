const fromIssueApi = (apiObj) => {
    if (apiObj.status === 200) {
        const parsedData = apiObj.data.items.map((issue) => ({
            [issue.id]: {
                title: issue.title,
                createdAt: issue.created_at,
                updatedAt: issue.updated_at,
                description: issue.body,
            },
        }))
        return parsedData
    }
    return null
}
export default (fromIssueApi)
