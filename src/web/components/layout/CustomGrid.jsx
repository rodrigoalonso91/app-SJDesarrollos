import { PersonAdd } from "@mui/icons-material"
import { Button, Typography } from "@mui/material"
import MaterialReactTable from "material-react-table"
import { useDispatch, useSelector } from "react-redux"
import deleteRowOnDatabase from "../../api_calls/deleteRowOnDatabase"
import updateRowOnDatabase from "../../api_calls/updateRowOnDatabase"
import { displayForm } from "../../store/form"
import { BasicEditActions } from "../table/BasicEditActions"
import { CustomModal } from "./CustomModal"
import { SPANISH_COLLECTIONS } from "../../constants/collections"
import { Box } from "@mui/system"
import { usePersonDataSource } from "../../hooks"
import { useState } from "react"

export const CustomGrid = ({ collection, columns, children, data }) => {

	const [isLoading, setIsLoading] = useState(false)

	const { dataSource, updateDataSource } = usePersonDataSource({ data })

	const { isFormActivated } = useSelector((state) => state.isActivatedForm)

	const dispatch = useDispatch()
	const handleClick = () => {
		dispatch(displayForm(true))
	}

	const handleSaveRowEdits = async ({ exitEditingMode, row, values }) => {

		setIsLoading(true)
		exitEditingMode()

		const { id } = row.original

		const record = {
			id,
			values: { ...values }
		}

		await updateRowOnDatabase(collection, record)

		const data = dataSource.map((data) =>
			data.id === id ? { id, ...values } : data
		)

		updateDataSource(data)
		setIsLoading(false)
	}

	const handleDeleteRow = async (row) => {

		setIsLoading(true)
		const { firstname, lastname, id } = row.original

		const newTableData = [...dataSource]

		if (!confirm(`Desea eliminar a ${firstname} ${lastname}?`)) return

		await deleteRowOnDatabase(collection, id)

		newTableData.splice(row.index, 1)
		updateDataSource(newTableData)
		setIsLoading(false)
	}

	return (
		<>
			<div style={{ 
				display: 'flex', 
				flexDirection: 'column', 
				gap: 35, 
				padding: 15
			}}
			>
				<Box sx={{
					display: 'flex',
					flexDirection: 'row-reverse',
				}}>
					<Button
						onClick={handleClick}
						variant="contained"
					>
						<PersonAdd sx={{ mr: "10px" }} />
						Agregar
					</Button>
				</Box>

				<MaterialReactTable
					state={{isLoading}}
					style={{ boxShadow: "3px 4.5px 9.5px 3.5px #000000" }}
					columns={columns}
					data={dataSource}
					initialState={{ columnVisibility: { id: false } }}
					enableColumnOrdering={false}
					enableGlobalFilter={false} //turn off a feature
					enableEditing
					editingMode="modal"
					positionActionsColumn="first"
					onEditingRowSave={handleSaveRowEdits}
					renderTopToolbarCustomActions={() => (
						<Typography sx={{ ml: 1 }} variant="h5">
							{SPANISH_COLLECTIONS[collection]}
						</Typography>
					)}
					renderRowActions={({ row, table }) => (
						<BasicEditActions
							row={row}
							table={table}
							handleDeleteRow={handleDeleteRow}
						/>
					)}
					displayColumnDefOptions={{
						'mrt-row-actions': {
						  header: 'Acciones'
					}
					}}
				/>
			</div>

			{isFormActivated && (
				<CustomModal headerText={`Agregar ${SPANISH_COLLECTIONS[collection]}`}>
					{children}
				</CustomModal>
			)}
		</>
	)
}
