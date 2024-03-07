"use client"
import "./styles/header.css"
import Link from "next/link"
import ButtonLogout from "./SignOutButton";
import { useSession } from "next-auth/react";
import { CiMenuFries } from "react-icons/ci";
import { AiOutlineClose } from "react-icons/ai";
import { useState } from "react";

const Header = () => {
	const { data } = useSession();
	const [ menuOpen, setMenuOpen ] = useState<boolean>(false);
	const isMobile = window.innerWidth <= 760;
	const toggleMenu = () => {
		const collapsible = document.getElementById("collapsible")!;
		const overlay = document.getElementById("overlay")!;
		console.log(collapsible.style.right)
		if (collapsible.style.right === "0px") {
			collapsible.style.right = "-66vw";
			overlay.style.display = "none";
			document.body.style.overflow = 'unset';
		}
		else {
			collapsible.style.right = "0px";
			overlay.style.display = "block";
			if (isMobile)
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
						<Link href="/blogs" onClick={toggleMenu}>Blogs</Link>
					</li>
					{data?.user?.email ? (
						<>
							<li>
								<Link href="/create" onClick={toggleMenu}>Create</Link>
							</li>
							<li>
								<Link href="/profile" onClick={toggleMenu}>Profile</Link>
							</li>
							<li>
								<Link href="/api/auth/signout" onClick={toggleMenu}>Sign Out</Link>
							</li>
						</>
					) : (<>
							<li>
								<Link href="/sign-in" onClick={toggleMenu}>Sign In</Link>
							</li>
							<li>
								<Link href="/sign-up" onClick={toggleMenu}>Sign Up</Link>
							</li>
						</>
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
