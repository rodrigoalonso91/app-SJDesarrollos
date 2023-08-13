import getCollectionFromDatabase from "@web/api_calls/getCollectionFromDatabase"
import { useState, useEffect } from "react"

/**
 * Retrieves a collection of data from the database based on the provided name.
 *
 * @param {Object} options - The options object.
 * @param {string} options.name - The name of the collection to retrieve.
 * @return {Object} - An object containing the collection data and the loading status.
 */
export default function useCollection ({ name }) {

    const [collection, setCollection] = useState([])
    const isLoading = collection.length === 0 

    useEffect(() => {

        getCollectionFromDatabase(name)
            .then(res => res.json())
            .then(data => {
                const people = data.map(person => {

                    if(name === 'administrators') {
                        return {
                            id: person.id,
                            fullname: `${person.firstname} ${person.lastname}`,
                            color: person.color
                        }
                    }

                    return {
                        id: person.id,
                        fullname: `${person.firstname} ${person.lastname}`
                    }
                })
                setCollection(people)
            })
    }, [name])

    return {
        isLoading,
        collection
    }
}
