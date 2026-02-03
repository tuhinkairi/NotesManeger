// posts
export interface FilterPosts {
    filter: "new" | "old" | "recent"| string|  undefined;
}

export interface NoteFields {
    id: string
    userId: string
    title: string
    content: string
    createdAt: Date
    updatedAt: Date
} 