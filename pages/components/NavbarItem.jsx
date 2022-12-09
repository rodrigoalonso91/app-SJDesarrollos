import Link from 'next/link'
import { useRouter } from "next/router";

export const NavbarItem = ({text, href}) => {

    const router = useRouter();

    const getClassName = () => {

        const isActive = router.pathname === href;
        const content = `nav-item nav-link ${isActive ? 'active' : ''}`
        return content.trim();
    };

    return (
        <Link href={href} className={getClassName()}>
            {text}
        </Link>
    )
}
