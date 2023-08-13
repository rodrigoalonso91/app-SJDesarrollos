import { useEffect, useState } from "react"

export function useModal ({ initialValue = false, id = 0}) {

    const [modal, setModal] = useState({ isOpen: initialValue, id })

    useEffect(() => {
        setModal({ isOpen: initialValue, id })
    }, [initialValue, id])

    const openModal = ({ id }) => {
        setModal({ isOpen: true, id })
    }

    const closeModal = ({ id }) => {
        setModal({ isOpen: false, id })
    }

    return {
        modal,
        openModal,
        closeModal
    }
}
