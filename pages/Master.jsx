import { Navbar } from "../src/web/components"
import { SJLogo } from "../src/web/components/SJLogo"
import useUserData from "../src/hooks/UseUserData";

export const Master = () => {

    const user = useUserData()

    return (
        <>
            <Navbar nickname={user.nickname}/>
            <h1>Master</h1>
            <SJLogo fill1="white" fill2="#03A293" />
            <SJLogo fill1="black" fill2="red" />
            <SJLogo fill1="white" fill2="blue" />
        </>
    )
}

export default Master