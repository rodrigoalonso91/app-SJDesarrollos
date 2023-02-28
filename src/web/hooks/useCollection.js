import getAllOnDatabase from "@web/api_calls/getAllOnDatabase"
import { useState, useEffect } from "react"

export default function useCollection ({ name }) {

    const [collection, setCollection] = useState([])
    const isLoading = collection.length === 0 

    useEffect(() => {

        getAllOnDatabase(name)
            .then(res => res.json())
            .then(data => {
                const customers = data.map( customer => {
                    return {
                        id: customer.id,
                        fullname: `${customer.firstname} ${customer.lastname}`
                    }
                })
                setCollection(customers)
            })
    }, [name])

    return {
        isLoading,
        collection
    }
}
