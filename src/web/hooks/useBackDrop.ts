import { useRouter } from "next/router"
import { useEffect, useState } from "react";

/**
 * Returns an object containing the state and functions for managing a backdrop.
 *
 * @returns {Object} An object with the following properties:
 *   - isOpen: A boolean representing whether the backdrop is open or not.
 *   - openBackDrop: A function to open the backdrop.
 *   - closeBackdrop: A function to close the backdrop.
 */
export function useBackDrop (): BackDropProps {

    const router = useRouter()
    const [isOpen, setIsOpen] = useState(false)

    useEffect( () => setIsOpen(router.isPreview), [router]);

    const openBackDrop = () => {
        setIsOpen(true)
    }

    const closeBackdrop = () => {
        setIsOpen(false)
    }

    return {
        isOpen,
        openBackDrop,
        closeBackdrop
    }
}

export type BackDropProps = {
    isOpen: boolean,
    openBackDrop: () => void,
    closeBackdrop: () => void
}