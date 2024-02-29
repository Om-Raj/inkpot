import { getCurrentUsser } from "@/lib/session"
import "./styles/header.css"
import Link from "next/link"
import ButtonLogout from "./ButtonLogout";

const Header = async () => {
    const user = await getCurrentUsser();

    return (
        <header className="header">
            <nav className="navbar">
                <Link href="/">InkPot</Link>
                <ul>
                    <li>
                        <Link href="/blogs">Blogs</Link>
                    </li>
                    {user?.name ? (
                        <>
                            <li>
                                <Link href="/create">Create</Link>
                            </li>
                            <li>
                                <Link href="/profile">Profile</Link>
                            </li>
                            <ButtonLogout />
                        </>
                    ) : (
                        <li>
                            <Link href="/api/auth/signin">Sign In</Link>
                        </li>
                    )}
                </ul>
            </nav>
        </header>
    )
}
export default Header