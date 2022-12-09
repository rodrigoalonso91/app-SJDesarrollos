import { Navbar } from './components'
import useUserData from "../src/UseUserData"

export const Salesman = () => {

    const user = useUserData()

    return (
        <>
            <Navbar nickname={ user.nickname }/>
            <h1>Grilla</h1>
        </>
    )
}

export default Salesman