import { PersonAdd } from "@mui/icons-material"
import { Button, Typography } from "@mui/material"
import MaterialReactTable from "material-react-table"
import { useDispatch, useSelector } from "react-redux"
import deletePersonFromDatabase from "../../api_calls/deletePersonFromDatabase"
import updatePersonInDatabase from "../../api_calls/updatePersonInDatabase"
import { displayForm } from "../../store/form"
import { BasicEditActions } from "../table/BasicEditActions"
import { AdministratorEditActions } from "../table/AdministratorEditActions"
import { CustomModal } from "./CustomModal"
import { SPANISH_COLLECTIONS } from "../../constants/collections"
import { Box } from "@mui/system"
import AddSheetButton from "../buttons/AddSheetButton"
import styled from "styled-components"
import usePersonGrid from "../../hooks/usePersonGrid"
import { useEffect } from "react"
import updateNeighborhoodsAdministrator from "@web/api_calls/neighborhood/updateNeighborhoodsAdministrator"

export default function PersonTable ({ collection, columns, children, data }) {
	
	const {
		personDataSource,
		addManyPeopleToDataSource,
		removeFromDataSource,
		updatePersonInDataSource,
		tableLoading,
	} = usePersonGrid()

	const { isLoading, enableLoading, disableLoading } = tableLoading

	const { isFormActivated } = useSelector(state => state.isActivatedForm)
	const dispatch = useDispatch()

	useEffect(() => {
		enableLoading()
		addManyPeopleToDataSource(data)
		disableLoading()
	}, [data])

	const handleClick = () => {
		dispatch(displayForm(true))
	}

	const handleSaveRowEdits = async ({ exitEditingMode, row, values }) => {

		enableLoading()
		exitEditingMode()

		const { id } = row.original

		const newCustomer = {
			id,
			values: { ...values }
		}

		await updatePersonInDatabase(collection, newCustomer)
 
		updatePersonInDataSource({ id, ...values })
		disableLoading()
	}

	const handleDeleteRow = async (row) => {

		enableLoading()
		const { firstname, lastname, id } = row.original
		
		if (!confirm(`Desea eliminar a ${firstname} ${lastname}?`)) return

		await deletePersonFromDatabase(collection, id)
		removeFromDataSource(row.index)
		disableLoading()
	}

	const handleUpdateColorInNeighborhood = async (row) => {

		const { id, firstname, lastname, color } = row.original

		const administrator = {
			id,
			fullname: `${firstname} ${lastname}`,
			color
		}

		const message = `Desea actualizar el color de ${administrator.fullname} en el master?`

		if (!confirm(message)) return

		enableLoading()
		await updateNeighborhoodsAdministrator(administrator)
		disableLoading()
	}

	return (
		<>
			<GridContainer>
				<Box sx={{ display: 'flex', flexDirection: 'row-reverse', gap: 4 }}>
					<AddSheetButton text="Carga masiva" />
					<Button onClick={handleClick} variant="contained">
						<PersonAdd sx={{ mr: "10px" }} />
						Agregar
					</Button>
				</Box>

				<MaterialReactTable
					state={{ isLoading }}
					style={{ boxShadow: "3px 4.5px 9.5px 3.5px #000000" }}
					columns={columns}
					data={personDataSource}
					initialState={{ columnVisibility: { id: false }, isLoading: false }}
					enableColumnOrdering={false}
					enableGlobalFilter={false}
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
						collection === 'administrators' 
							? <AdministratorEditActions
								row={row}
								table={table}
								handleDeleteRow={handleDeleteRow}
								handleUpdateColorInNeighborhood={handleUpdateColorInNeighborhood}
							  />
							: <BasicEditActions 
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
			</GridContainer>

			{isFormActivated && (
				<CustomModal headerText={`Agregar ${SPANISH_COLLECTIONS[collection]}`}>
					{children}
				</CustomModal>
			)}
		</>
	)
}

const GridContainer = styled.section`
	display: flex;
	flex-direction: column; 
	gap: 35px;
	padding: 15px;
`