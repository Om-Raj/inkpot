import { getCurrentUser } from "@/lib/session";
import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { now } from "next-auth/client/_utils";


export async function POST(req: Request) {
    const user = await getCurrentUser();
    try {
        if (!user?.email) {
            return NextResponse.json({message: 'Not Authenticated!'}, {status: 401})
        }
        const {title, content} = await req.json();
        const newPost = await prisma.post.create({
            data: {
                title, content, authorEmail: user.email
            }
        })
        return NextResponse.json({newPost}, {status: 200})
    } catch (error) {
        return NextResponse.json({message: 'Something went wrong!'}, {status: 500})
    }
}

export async function PATCH(req: Request) {
    const user = await getCurrentUser();
    try {
        const { id, authorEmail, title, content } = await req.json();
        if (!user?.email || user?.email !== authorEmail) {
            return NextResponse.json({message: 'Not Authenticated!'}, {status: 401})
        }
        const newPost = await prisma.post.update({
            where: {
                id
            },
            data: {
                title,
                content,
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
        const { id, authorEmail } = await req.json();
        if (!user?.email || user?.email !== authorEmail) {
            return NextResponse.json({message: 'Not Authenticated!'}, {status: 401})
        }
        const response = await prisma.post.delete({
            where: {
                id
            }
        })
        return NextResponse.json({response}, {status: 200})
    } catch (error) {
        return NextResponse.json({message: 'Something went wrong!'}, {status: 500})
    }
}