import { useEffect, useState } from "react"

export function useModal ({ initialValue = false }) {
    const [isModalOpen, setIsModalOpen] = useState(initialValue)

    useEffect(() => {
        setIsModalOpen(initialValue)
    }, [initialValue])

    const openModal = () => {
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
    }

    return {
        isModalOpen,
        openModal,
        closeModal
    }
}
