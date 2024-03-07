import { getCurrentUser } from "@/lib/session";
import { NextResponse } from "next/server";
import prisma from "@/lib/db";


export async function POST(req: Request) {
    const user = await getCurrentUser();
    try {
        if (!user?.email) {
            return NextResponse.json({message: 'Not Authenticated!'}, {status: 401})
        }
        const {postId, text} = await req.json();
        const newPost = await prisma.comment.create({
            data: {
                postId, text, authorEmail: user.email
            }
        })
        return NextResponse.json({newPost}, {status: 200})
    } catch (error) {
        return NextResponse.json({message: 'Something went wrong!'}, {status: 500})
    }
}

export async function DELETE(req: Request) {
    const user = await getCurrentUser();
    try {
        const { authorEmail, commentId } = await req.json();
        if (!user?.email || user.email !== authorEmail) {
            return NextResponse.json({message: 'Not Authenticated!'}, {status: 401})
        }
        const newPost = await prisma.comment.delete({
            where: {
                id: commentId
            }
        })
        return NextResponse.json({newPost}, {status: 200})
    } catch (error) {
        return NextResponse.json({message: 'Something went wrong!'+error}, {status: 500})
    }
}