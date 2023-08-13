import { createContext } from "react";

export const ModalContext = createContext({
    isModalOpen: false
});


type Props = {
    children: React.ReactNode
}

export default function ModalDataProvider({ children }: Props) {
    return (
        <ModalContext.Provider value={{isModalOpen: false}}>
            {children}
        </ModalContext.Provider>
    )
}