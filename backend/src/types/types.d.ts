// posts
export interface FilterPosts {
    filter: "new" | "old" | "recent";
}

export interface NoteFields {
    id: string
    userId: string
    title: string
    content: string
    createdAt: Date
    updatedAt: Date
} 