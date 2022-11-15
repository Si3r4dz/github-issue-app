const fromIssueApi = (apiObj) => {
    if (apiObj.status === 200) {
        const parsedData = Object.assign(
            {},
            ...apiObj.data.items.map((issue) => ({
                [issue.id]: {
                    id: issue.id,
                    title: issue.title,
                    createdAt: issue.created_at,
                    updatedAt: issue.updated_at,
                    description: issue.body,
                    state: issue.state,
                },
            })),
        )
        return parsedData
    }
    return null
}
export default (fromIssueApi)
