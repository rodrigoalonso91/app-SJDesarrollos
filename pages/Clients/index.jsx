import React from 'react'
import useUserData from '../../src/UseUserData';
import { Navbar } from '../../src/web/components'

export const Clients = () => {

    const user = useUserData();
    
    return (
        <>
            <Navbar nickname={ user.nickname }/>
            <h1>Clientes</h1>
        </>
    )
}

export default Clients