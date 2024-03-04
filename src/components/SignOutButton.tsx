"use client"

import { signOut } from "next-auth/react"
import { Button } from "./ui/button";

const SignOutButton= () => {
    const handleSignOut = async () => signOut({
        callbackUrl: '/',
    });
    return (
        <Button className='w-full mt-6' type='submit' onClick={handleSignOut}>
            Sign Out 
        </Button>
    )
}
export default SignOutButton 