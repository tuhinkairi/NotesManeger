import { FilterPosts, NoteFields } from "../types/types";
import { Prisma, PrismaClient } from "../generated/prisma/client";
import { NoteUncheckedCreateInput, NoteUpdateInput, UserCreateInput, UserUpdateInput } from "../generated/prisma/models";
import { withAccelerate } from "@prisma/extension-accelerate";


export default class DatabaseManager {
    public prisma;

    constructor() {
        if (!process.env.DATABASE_URL) {
            throw new Error("DATABASE_URL is not defined in environment variables.");
        }
        this.prisma = new PrismaClient({ accelerateUrl: process.env.DATABASE_URL }).$extends(withAccelerate());
        this.prisma.$connect().then((res)=>{console.log("connected")})
    }

    // user
    async getUser({ userId, email }: { userId: string, email?: string }){
        const user = await this.prisma.user.findUnique({
            where: userId ? { id: userId } : { email: email! }
        });
        return user;
    }

    async createUser(data: UserCreateInput){
        try{
            const user = await this.prisma.user.create({
                data: data,
            });
            return user;
        }
        catch (err){
            console.log(err)
            return null
        }
    }

    async updateUser({ userId, data }: { userId: string, data: UserUpdateInput }){
        const user = await this.prisma.user.update({
            where: { id: userId },
            data: data,
        });
        return user;
    }

    async deleteUser({ userId }: { userId: string }){
        const user = await this.prisma.user.delete({
            where: { id: userId },
        });
        return user;
    }

    // posts
    async createPosts({ data }: { data: NoteUncheckedCreateInput }){
        const post = await this.prisma.note.create({
            data: data
        })
        return post;
    }

    async getPosts({ orderby, search, userId }: { orderby?: FilterPosts, search?: string, userId: string }) {
        let orderBy: Prisma.NoteOrderByWithRelationInput;

        switch (orderby?.filter) {
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
                userId,
                ...(search && { title: { contains: search } } || { content: { contains: search } })
            },
            orderBy: {
                createdAt: orderby?.filter === "new" ? "desc" : orderby?.filter === "old" ? "asc" : "desc"
            }
        });

        return posts;
    }

    async updatePost({ postId,  data }: { postId: string, data: NoteUpdateInput }){
        const post = await this.prisma.note.update({
            where: {
                id: postId
            },
            data: data
        });
        return post;
    }

    async deletePost({ postId }: { postId: string}){
        const post = await this.prisma.note.delete({
            where: { id: postId},
        });
        return post;
    }

    async disconnect() {
        await this.prisma.$disconnect();
    }
}