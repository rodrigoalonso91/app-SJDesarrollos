import Link from "next/link"
import "bootstrap/dist/css/bootstrap.css"
import Image from "next/image"
import { Backdrop, CircularProgress } from "@mui/material"
import useUserData from "../hooks/UseUserData"
import { useBackDrop } from "@web/hooks"
import NavbarItems from "./NavbarItems"

export const Navbar = () => {

    const user = useUserData()
	const { isOpen, openBackDrop } = useBackDrop(false)
	const handleClick = () => openBackDrop()

	return (
		<>
			<nav className="navbar navbar-expand-sm navbar-dark bg-dark p-2">
				<Link className="navbar-brand" href="/">
					<Image
						src="/logos/SJ-Logo-Wh.png"
						alt="SJ Desarrollo"
						width={150}
						height={70}
						priority
						onClick={handleClick}
					/>
				</Link>

				<div className="navbar-collapse">
					<NavbarItems user={user} handleClick={handleClick} />
				</div>

				<div className="navbar-collapse collapse w-100 order-3 dual-collapse2 d-flex justify-content-end">
					<ul className="navbar-nav ml-auto">
						<span className="nav-item nav-link text-primary">
							{user.nickname}
						</span>

						<Link href="/api/auth/logout" className="nav-item nav-link btn">
							Logout
						</Link>
					</ul>
				</div>
			</nav>

			<Backdrop style={{ zIndex: 100 }} open={isOpen}>
				<CircularProgress color="inherit" />
			</Backdrop>
		</>
	)
}
