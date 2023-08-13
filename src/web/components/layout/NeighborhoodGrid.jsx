import MaterialReactTable from "material-react-table"
import { useState } from "react"
import updatePersonInDatabase from "../../api_calls/updatePersonInDatabase";
import useUserData from "../../hooks/UseUserData"
import { NEIGHBORHOOD_COLUMNS } from "../../constants/neighborhoodColumns"
import useNeighborhoodGrid from "../../hooks/useNeighborhoodGrid";
import { NeighborhoodEditActions } from "../table/NeighborhoodEditActions";
import { LotDetailsModal } from "../neighborhood/LotDetailsModal";

export const NeighborhoodGrid = ({ data }) => {

    const [ isLoading, setIsLoading ] = useState(false)

    const [isModalOpen, setIsModalOpen] = useState(false)

    const user = useUserData()

    const { dataSource, getGridTitle, updateDataSource } = useNeighborhoodGrid({ data })

    const handleOnRowSave = async ({ row, values, exitEditingMode }) => {

        setIsLoading(true)
        exitEditingMode()
        const { index } = row
        
        const lot = { ...values }
        delete lot.name

        const dataToUpdate = { ...data }
        dataToUpdate.blocks = dataToUpdate.blocks.map( block => {

            if (block.name !== values.name) return block

            const newLot = updateLot({ block, lotName: values.lot, values: lot })
            const lotIndex = block.lots.findIndex( lt => lt.name === newLot.name )

            block.lots[lotIndex] = newLot
            return {
                ...block
            }
        })

        await updatePersonInDatabase('neighborhoods', dataToUpdate)
        
        const newData = dataSource.map((data, i) => {
            return i === index ? { ...values } : data
        })
        updateDataSource(newData)
        setIsLoading(false)
    }
    
    return (
        <>
            <LotDetailsModal isOpen={isModalOpen}/>
            <MaterialReactTable
                state={{ isLoading }}
                renderTopToolbarCustomActions={getGridTitle}
                columns={filterColumnsByUser({ columns: NEIGHBORHOOD_COLUMNS, user })}
                data={dataSource ?? []}
                enableEditing={user.isAdmin}
                editingMode="modal"
                onEditingRowSave={handleOnRowSave}
                renderRowActions={({ row, table }) => (
                    <NeighborhoodEditActions
                        row={row}
                        table={table}
                        setIsModalOpen={setIsModalOpen}
                    />
                )}
                displayColumnDefOptions={{
                    'mrt-row-actions': {
                    header: 'Acciones'
                    }
                }}
            />
        </>
    )
}

const getSalesmanEnabledView = ({ columns }) => {

    const hiddenColumns = ['customer', 'coCustomer']
    return columns.filter( column => !hiddenColumns.includes(column.accessorKey))
}

const filterColumnsByUser = ({ columns, user }) => {

    if (user.isSalesman) return getSalesmanEnabledView({ columns })
    return NEIGHBORHOOD_COLUMNS
}

const updateLot = ({ block, lotName, values }) => {

    const lot = block.lots.find(lot => lot.name === lotName);

    if (!lot) return {}

    delete values.lot
    return { ...lot, ...values }
}