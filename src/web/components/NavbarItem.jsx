import Link from 'next/link'
import { useRouter } from "next/router";

export const NavbarItem = ({text, href, handleOnClick}) => {

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
            onClick={ router.asPath === href ? undefined : handleOnClick } 
        >
            {text}
        </Link>
    )
}
