import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { compare, hash } from 'bcrypt';
import * as z from 'zod';
import { getCurrentUser } from "@/lib/session";

// define a schema for input validation
const userSchema = z
  .object({
    name: z.string().min(1, 'Name is required').max(100)
  });



export async function PATCH(req: Request) {
    const user = await getCurrentUser();
    try {
        const body = await req.json();
        const { name } = userSchema.parse(body);

        if (!user || !user.email) {
            return NextResponse.json({message: "Not authenticated!"}, {status: 409})
        }

        const updatedUser = await prisma.user.update({
            where: {
                email: user.email
            },
            data: {
                name
            }
        });
        return NextResponse.json({message: "User name changed successfully"}, {status: 201});
    } catch (error) {
        return NextResponse.json({message: "Something went wrong"}, {status: 500});
    }
}