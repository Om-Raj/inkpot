import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { compare, hash } from 'bcrypt';
import * as z from 'zod';
import { getCurrentUser } from "@/lib/session";

// define a schema for input validation
const userSchema = z
  .object({
    name: z.string().min(1, 'Name is required').max(100),
    email: z.string().min(1, 'Email is required').email('Invalid email'),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(8, 'Password must have more than 8 characters'),
    })

const ChangePasswordSchema = z
  .object({
    password: z
      .string()
      .min(1, 'Current password is required')
      .min(8, 'Password must have more than 8 characters'),
    newPassword: z
      .string()
      .min(1, 'Password is required')
      .min(8, 'Password must have more than 8 characters'),
  })

const DeleteAccountSchema = z
  .object({
    password: z
      .string()
      .min(1, 'Password is required')
      .min(8, 'Password must have more than 8 characters'),
  })




export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, name, password } = userSchema.parse(body);
        // check if email already exists
        const existingUserByEmail = await prisma.user.findUnique({
            where: {
                email
            }
        });
        if (existingUserByEmail) {
            return NextResponse.json({user: null, message: "User with this email already exists"}, {status: 409})
        }

        const hashedPassword = await hash(password, 10)

        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword
            }
        });
        const { password: newPassword, ...rest } = newUser;

        return NextResponse.json({user: rest, message: "User registered successfully"}, {status: 201});
    } catch (error) {
        return NextResponse.json({message: "Something went wrong"}, {status: 500});
    }
}

export async function PATCH(req: Request) {
    const user = await getCurrentUser();
    try {
        const body = await req.json();
        const { password, newPassword } = ChangePasswordSchema.parse(body);
        if (!user || !user.email) {
            return NextResponse.json({message: "Not authenticated!"}, {status: 409})
        }

        const existingUserByEmail = await prisma.user.findUnique({
            where: {
                email: user.email!
            }
        });
        
        if (!existingUserByEmail?.password || await compare(password, existingUserByEmail.password)) {
            const hashedNewPassword = await hash(newPassword, 10)
            const updatedUser = await prisma.user.update({
                where: {
                    email: user.email,
                },
                data: {
                    password: hashedNewPassword
                }
            });
            return NextResponse.json({message: "Password changed successfully"}, {status: 201});
        } else {
            return NextResponse.json({message: "Wrong password"}, {status: 409});
        }
    } catch (error) {
        return NextResponse.json({message: "Something went wrong"}, {status: 500});
    }
}


export async function DELETE(req: Request) {
    const user = await getCurrentUser();
    try {
        const body = await req.json();
        const { password } = await DeleteAccountSchema.parse(body);
        if (!user || !user.email) {
            return NextResponse.json({message: 'Not Authenticated'}, {status: 409});
        }
        const accountPassword = await prisma.user.findUnique({
            where: {
                email: user.email
            },
            select: {
                password: true  
            }
        })
        if (!accountPassword || !accountPassword.password) {
            return NextResponse.json({message: 'Account password not set.'}, {status: 409})
        }
        if (await compare(password, accountPassword.password)) {
            const response = await prisma.user.delete({
                where: {
                    email: user.email
                }
            })
            return NextResponse.json({message: "Account deleted successfully"}, {status: 201});
        } else {
            return NextResponse.json({message: "Wrong password"}, {status: 409});
        }
    } catch(error) {
        NextResponse.json({message: 'Something went wrong!'}, {status: 500})
    }
}