import { createContext } from "react";
import useCustomerDataSourceReducer from "../web/hooks/useCustomerDataSourceReducer";

export const PersonGridContext = createContext();

export function PersonGridDataProvider({ children }) {

    const context = useCustomerDataSourceReducer()

    return (
        <PersonGridContext.Provider 
            value={{...context}}
        >
            { children }
        </PersonGridContext.Provider>
    )
}