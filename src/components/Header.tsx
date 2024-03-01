"use client"
import "./styles/header.css"
import Link from "next/link"
import ButtonLogout from "./ButtonLogout";
import { useSession } from "next-auth/react";
import { CiMenuFries } from "react-icons/ci";
import { AiOutlineClose } from "react-icons/ai";
import { useState } from "react";

const Header = () => {
	const { data } = useSession();
	const [ menuOpen, setMenuOpen ] = useState<boolean>(false);
	const toggleMenu = () => {
		const collapsible = document.getElementById("collapsible")!;
		const overlay = document.getElementById("overlay")!;
		if (collapsible.style.display === "flex") {
			collapsible.style.display = "none";
			overlay.style.display = "none";
			document.body.style.overflow = 'unset';
		}
		else {
			collapsible.style.display = "flex";
			overlay.style.display = "block";
			document.body.style.overflow = 'hidden';
		}
		setMenuOpen(!menuOpen)
	}

	return (
		<header className="header">
			<nav className="navbar">
				<Link href="/" id="navbar-brand">InkPot</Link>
				<ul id="collapsible">
					<li>
						<Link href="/blogs">Blogs</Link>
					</li>
					{data?.user?.email ? (
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
				<div id="toggle-menu-btn" onClick={toggleMenu}>
					{menuOpen===true?(
						<AiOutlineClose />
					):(
						<CiMenuFries />
					)}
				</div>
			</nav>
			<div id="overlay" onClick={toggleMenu}></div>
		</header>
	)
}
export default Header