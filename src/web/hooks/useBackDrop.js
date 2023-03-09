import { useRouter } from "next/router"
import { useEffect, useState } from "react";

export function useBackDrop () {

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
