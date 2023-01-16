import Link from 'next/link'
import { NavbarItem } from './index'
import 'bootstrap/dist/css/bootstrap.css'
import Image from 'next/image'

export const Navbar = ({nickname}) => {

    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark p-2 mb-3">

            <Link className="navbar-brand" href='/'>
                <Image src='/logos/SJ-Logo-Wh.png' alt='SJ Desarrollo' width={150} height={70}/>
            </Link>

            <div className="navbar-collapse">
                <div className="navbar-nav">
                    <NavbarItem href="/Master" text="Master" />
                    <NavbarItem href="/neighborhoods" text="Barrios" />
                    <NavbarItem href="/Salesmen" text="Vendedores" />
                    <NavbarItem href="/Clients" text="Clientes" />
                </div>
            </div>

            <div className="navbar-collapse collapse w-100 order-3 dual-collapse2 d-flex justify-content-end">
                <ul className="navbar-nav ml-auto">

                    <span className='nav-item nav-link text-primary'>
                        {
                            nickname
                        }
                    </span>

                    <Link href="/api/auth/logout" className='nav-item nav-link btn'>
                        Logout
                    </Link>

                </ul>
            </div>
            
        </nav>
    )
}