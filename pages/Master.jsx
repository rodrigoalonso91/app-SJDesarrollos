import { Navbar } from "./components"
import useUserData from "../src/UseUserData"

export const Master = () => {

    const user = useUserData()

    return (
        <>
            <Navbar nickname={user.nickname}/>
            <h1>Master</h1>
        </>
    )
}

export default Master
