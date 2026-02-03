import { PrismaPg } from "@prisma/adapter-pg";
import { Prisma, PrismaClient } from "../../prisma/generated/client";
import { FilterPosts, NoteFields } from "../types";
import { NoteCreateInput, UserCreateInput } from "../../prisma/generated/models";

export default class DatabaseManager {
    private adapter: PrismaPg;
    public prisma: PrismaClient;

    constructor() {
        if (!process.env.DATABASE_URL) {
            throw new Error("DATABASE_URL is not defined in environment variables.");
        }
        this.adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL});
        this.prisma = new PrismaClient({ adapter: this.adapter });
    }

    // user
    async getUser({userId}:{userId: string}): Promise<Prisma.UserGetPayload<Record<string, unknown>> | null> {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
        });
        return user;
    }

    async createUser(data: UserCreateInput):Promise<Prisma.UserGetPayload<Record<string, unknown>> | null> {
        const user = await this.prisma.user.create({
            data: data,
        });
        return user;
    }

    async updateUser({userId, data}:{userId: string, data: Partial<UserCreateInput>}):Promise<Prisma.UserGetPayload<Record<string, unknown>> | null> {
        const user = await this.prisma.user.update({
            where: { id: userId },
            data: data,
        });
        return user;
    }

    async deleteUser({userId}:{userId: string}):Promise<Prisma.UserGetPayload<Record<string, unknown>> | null> {
        const user = await this.prisma.user.delete({
            where: { id: userId },
        });
        return user;
    }

    // posts
    async createPosts({data}: {data: NoteCreateInput}):Promise<Prisma.NoteGetPayload<Record<string, unknown>> | null> {
        const post = await this.prisma.note.create({
            data: data
        })
        return post;
    }

    async getPosts({orderby, search}:{orderby: FilterPosts, search?: string}):Promise<Prisma.NoteGetPayload<Record<string, unknown>>[]> {
        let orderBy: Prisma.NoteOrderByWithRelationInput;
        
        switch (orderby.filter) {
            case "recent":
                orderBy = { updatedAt: Prisma.SortOrder.desc };
                break;

            case "new":
                orderBy = { createdAt: Prisma.SortOrder.desc };
                break;

            case "old":
                orderBy = { createdAt: Prisma.SortOrder.asc };
                break;

            default:
                orderBy = { createdAt: Prisma.SortOrder.desc };
        }
        const posts = await this.prisma.note.findMany({
            where: {
                ...(search && { title: { contains: search } } || { content: { contains: search } })
            },
            orderBy: {
                createdAt: orderby.filter === "new" ? "desc" : orderby.filter === "old" ? "asc" : "desc"
            }
        });

        return posts;
    }

    async updatePost({postId, data}:{postId: string, data: Partial<NoteFields>}):Promise<Prisma.NoteGetPayload<Record<string, unknown>> | null> {
        const post = await this.prisma.note.update({
            where: { id: postId },
            data: data
        });
        return post;
    }

    async deletePost({postId}: {postId: string}):Promise<Prisma.NoteGetPayload<Record<string, unknown>> | null> {
        const post = await this.prisma.note.delete({
            where: { id: postId },
        });
        return post;
    }

    async disconnect() {
        await this.prisma.$disconnect();
    }
}