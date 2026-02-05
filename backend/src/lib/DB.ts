import { FilterPosts, NoteFields } from "../types/types";
import { Prisma, PrismaClient } from "../generated/prisma/client";
import { NoteCreateInput, NoteUncheckedCreateInput, NoteUpdateInput, UserCreateInput, UserUpdateInput } from "../generated/prisma/models";
import { withAccelerate } from "@prisma/extension-accelerate";
import { AppError } from "../utils/appError";
import { contentValidator } from "../utils/content-validatior";


export default class DatabaseManager {
    public prisma;

    constructor() {
        if (!process.env.DATABASE_URL) {
            throw new Error("DATABASE_URL is not defined in environment variables.");
        }
        this.prisma = new PrismaClient({ accelerateUrl: process.env.DATABASE_URL }).$extends(withAccelerate());
        this.prisma.$connect().then(() => { console.log("connected") })
    }

    // user
    async getUser({ userId, email }: { userId?: string, email?: string }) {
        const user = await this.prisma.user.findUnique({
            where: userId ? { id: userId } : { email: email }
        });
        return user;
    }

    async createUser(data: UserCreateInput) {

        // check exist?
        const prev = await this.getUser({ email: data.email })
        if (prev) {
            throw new AppError("email already registered", 400)
        }
        const user = await this.prisma.user.create({
            data: contentValidator(data),
        });
        return user;
    }

    async updateUser({ userId, data }: { userId: string, data: UserUpdateInput }) {
        const user = await this.prisma.user.update({
            where: { id: userId },
            data: contentValidator(data),
        });
        return user;
    }

    async deleteUser({ userId }: { userId: string }) {
        const user = await this.prisma.user.delete({
            where: { id: userId },
        });
        return user;
    }

    // posts
    async createPosts({ data }: { data: NoteUncheckedCreateInput }) {
        const post = await this.prisma.note.create({
            data: contentValidator(data)
        })
        return post;
    }

    async getPosts({ orderby, search, userId }: { orderby?: FilterPosts, search?: string, userId: string }) {

        // Build orderBy dynamically
        let orderByClause: any;

        switch (orderby?.filter) {
            case "recent":
                orderByClause = { updatedAt: "desc" };
                break;
            case "new":
                orderByClause = { createdAt: "desc" };
                break;
            case "old":
                orderByClause = { createdAt: "asc" };
                break;
            default:
                orderByClause = { createdAt: "desc" };
        }

        const posts = await this.prisma.note.findMany({
            where: {
                userId,
                ...(search && {
                    OR: [
                        { title: { contains: search, mode: 'insensitive' } },
                        { content: { contains: search, mode: 'insensitive' } }
                    ]
                })
            },
            orderBy: orderByClause
        });

        return posts;
    }

    async updatePost({ postId, userId, data }: { postId: string,userId: string, data: NoteUpdateInput }) {
        const post = await this.prisma.note.update({
            where: {
                id: postId,
                userId
            },
            data: contentValidator(data)
        });
        return post;
    }

    async deletePost({ postId }: { postId: string }) {
        const post = await this.prisma.note.delete({
            where: { id: postId },
        });
        return post;
    }

    async disconnect() {
        await this.prisma.$disconnect();
    }
}