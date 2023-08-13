import { Button, Grid, TextField, Typography } from "@mui/material"
import { useDispatch } from "react-redux"
import { useField } from "../hooks"
import { displayForm } from "../store/form"
import addPersonToDatabase from "../api_calls/addPersonToDatabase"
import usePersonGrid from "../hooks/usePersonGrid"

export const AddBasicPersonForm = ({ collection }) => {

	const { addPersonToDataSource, tableLoading } = usePersonGrid()
	const { enableLoading, disableLoading } = tableLoading
	
    const firstname = useField({ type: "text", label: 'Nombre', placeholder: 'Ej: Juan' })
	const lastname = useField({ type: "text" , label: 'Apellido', placeholder: 'Ej: Garcia' })
	const phone = useField({ type: "text", label: 'Teléfono', placeholder: 'Ej: 1171348080' })
	const email = useField({ type: "text", label: 'Email', placeholder: 'Ej: JuanGarcia@gmail.com'})

	const inputs = [ firstname, lastname, phone, email ]

	const dispatch = useDispatch()

	const handleClickOnAdd = async () => {
		const newPerson = {
			firstname: firstname.value,
			lastname: lastname.value,
			phone: phone.value,
			email: email.value
		}

		dispatch(displayForm(false))

		enableLoading()
		const { id } = await addPersonToDatabase(collection, newPerson)
		addPersonToDataSource({ ...newPerson, id })
		disableLoading()
	}

	const handleClickOnCancel = () => {
		dispatch(displayForm(false))
		disableLoading()
	}

	return (
		<form>
			<Grid container>
				{
					inputs?.map( input => (
						<Grid key={input.label} item xs={12} sx={{ mt: 2 }}>
							<TextField
								{...input}
								fullWidth
							/>
						</Grid>
					) )
				}

				<Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
					<Grid item xs={12} sm={6}>
						<Button color="success" variant="contained" fullWidth onClick={handleClickOnAdd}>
							Crear
						</Button>
					</Grid>

					<Grid item xs={12} sm={6}>
						<Button color="error" variant="contained" fullWidth onClick={handleClickOnCancel}>
							<Typography>Cancelar</Typography>
						</Button>
					</Grid>
				</Grid>
			</Grid>
		</form>
	)
}
