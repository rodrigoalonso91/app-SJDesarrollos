import Link from "next/link"
import { NavbarItem } from "./index"
import "bootstrap/dist/css/bootstrap.css"
import Image from "next/image"
import { Backdrop, CircularProgress } from "@mui/material"
import useUserData from "../hooks/UseUserData"
import { useBackDrop } from "@web/hooks"

export const Navbar = () => {

	const user = useUserData();
	const { isOpen, openBackDrop } = useBackDrop(false)
	
	const handleClick = () => openBackDrop();

	return (
		<>
			<nav className="navbar navbar-expand-sm navbar-dark bg-dark p-2">
				<Link className="navbar-brand" href="/">
					<Image
						src="/logos/SJ-Logo-Wh.png"
						alt="SJ Desarrollo"
						width={150}
						height={70}
					/>
				</Link>

				<div className="navbar-collapse">
					<div className="navbar-nav">
						{
							user.isAdmin && 
							<NavbarItem
								href="/master"
								text="Master"
								handleOnClick={handleClick}
							/>
						}
						
						<NavbarItem
							href="/barrios"
							text="Barrios"
							handleOnClick={handleClick}
						/>
						{
							user.isAdmin && 
							<NavbarItem
								href="/vendedores"
								text="Vendedores"
								handleOnClick={handleClick}
							/>
						}
						{
							user.isAdmin && 
							<NavbarItem
								href="/clientes"
								text="Clientes"
								handleOnClick={handleClick}
							/>
						}
					</div>
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
