import Link from 'next/link'
import { useRouter } from "next/router";

export const NavbarItem = ({text, href, handleClick}) => {

    const router = useRouter();

    const getClassName = () => {
        const isActive = router.asPath === href;
        const content = `nav-item nav-link ${isActive ? 'active' : ''}`
        return content.trim();
    };

    return (
        <Link 
            href={href}
            className={getClassName()} 
            onClick={ router.asPath === href ? undefined : handleClick } 
        >
            {text}
        </Link>
    )
}