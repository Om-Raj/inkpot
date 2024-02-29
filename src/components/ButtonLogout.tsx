"use client"

import { signOut } from "next-auth/react"
import Link from "next/link"

const ButtonLogout = () => {
    return (
        <Link href='/api/auth/signout'>Sign Out</Link>
    )
}
export default ButtonLogout