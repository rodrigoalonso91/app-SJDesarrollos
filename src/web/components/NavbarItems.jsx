import { NavbarItem } from "./index"
import { NAVBAR_ITEMS } from "../constants/navbarItems"

export default function NavbarItems({ user, handleClick }) {

    const CONDITION_TO_RENDER = {
        admin: user.isAdmin,
        neighborhood: user.roles.length > 0
    }

    return (
        <div className="navbar-nav">
            {
                NAVBAR_ITEMS.map(item => {
                    return (CONDITION_TO_RENDER[item.conditionToRender] &&
                        <NavbarItem
                            key={item.id}
                            text={item.title}
                            href={`/${item.title.toLocaleLowerCase()}`}
                            handleClick={handleClick}
                        />
                    )
                })
            }
        </div>
    )
}
