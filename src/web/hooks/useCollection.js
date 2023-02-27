import getAllOnDatabase from "@web/api_calls/getAllOnDatabase"
import { useState, useEffect } from "react"

export default function useCollection ({ collection }) {

    const [options, setOptions] = useState([])
    const loading = options.length === 0 

    useEffect(() => {

        getAllOnDatabase(collection)
            .then(res => res.json())
            .then(data => {
                const customers = data.map( customer => {
                    return {
                        id: customer.id,
                        fullname: `${customer.firstname} ${customer.lastname}`
                    }
                })
                setOptions(customers)
            })
    }, [collection])

    return {
        loading,
        options
    }
}
