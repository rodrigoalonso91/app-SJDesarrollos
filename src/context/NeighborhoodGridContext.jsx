import useLotsDataSourceReducer from "@web/hooks/useLotsDataSourceReducer";
import { createContext, ReactNode } from "react";

export const NeighborhoodGridContext = createContext([]);

export const NeighborhoodGridDataProvider = ({ children }) => {

    const { dataSource, updateDataSource } = useLotsDataSourceReducer()

    return (
        <NeighborhoodGridContext.Provider
            value={{
                dataSource,
                updateDataSource
            }}
        >
            { children }
        </NeighborhoodGridContext.Provider>
    )
}