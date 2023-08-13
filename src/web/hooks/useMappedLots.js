import { useMemo } from "react"

export default function useMappedLots({ blocks }) {

    const mappedLots = useMemo(
        () => blocks?.flatMap( block => {
            return block.lots.map( lt => { 
                return {
                    name: block.name,
                    lot: lt.name,
                    price: lt.price ? `${lt.price}` : '',
                    status: lt.status ? lt.status : 'Disponible',
                    administrator: lt.administrator,
                    coCustomer: lt.coCustomer,
                    customer: lt.customer,
                    salesman: lt.salesman,
                    details: lt.details
                }
        })
    }), [blocks])

    return {
        mappedLots
    }
}