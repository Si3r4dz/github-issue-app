class Issue {
    constructor(data = {}) {
        const {
            title, description, createdAt, updatedAt, status,
        } = data

        this.title = title || ''
        this.description = description || ''
        this.createdAt = createdAt || new Date()
        this.updatedAt = updatedAt || new Date()
        this.status = status || ''
    }
}

export default Issue
