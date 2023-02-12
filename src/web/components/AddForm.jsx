import { Button, Grid, TextField, Typography } from "@mui/material"
import { useDispatch } from "react-redux"
import { useField } from "../hooks"
import { displayForm } from "../store/form"
import addRowInDatabase from "../api_calls/addRowInDatabase"

export const AddForm = ({ collection, data, setData }) => {
	const firstname = useField({ type: "text" })
	const lastname = useField({ type: "text" })
	const phone = useField({ type: "text" })
	const email = useField({ type: "text" })

	const dispatch = useDispatch()

	const handleClickOnAdd = async () => {
		const row = {
			firstname: firstname.value,
			lastname: lastname.value,
			phone: phone.value,
			email: email.value
		}

		await addRowInDatabase(collection, row)

		const updatedData = [...data, { ...row }]
		setData(updatedData)

		dispatch(displayForm(false))
	}

	const handleClickOnCancel = () => {
		dispatch(displayForm(false))
	}

	return (
		<form>
			<Grid container>
				<Grid item xs={12} sx={{ mt: 2 }}>
					<TextField
						label="Nombre"
						type="text"
						placeholder="Ej: Juan"
						fullWidth
						{...firstname}
					/>
				</Grid>

				<Grid item xs={12} sx={{ mt: 2 }}>
					<TextField
						label="Apellido"
						type="text"
						placeholder="Ej: Garcia"
						fullWidth
						{...lastname}
					/>
				</Grid>

				<Grid item xs={12} sx={{ mt: 2 }}>
					<TextField
						label="Teléfono"
						type="text"
						placeholder="Ej: 1171348080"
						fullWidth
						{...phone}
					/>
				</Grid>

				<Grid item xs={12} sx={{ mt: 2 }}>
					<TextField
						label="Email"
						type="email"
						placeholder="Ej: JuanGarcia@gmail.com"
						fullWidth
						{...email}
					/>
				</Grid>

				<Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
					<Grid item xs={12} sm={6}>
						<Button variant="contained" fullWidth onClick={handleClickOnAdd}>
							Crear
						</Button>
					</Grid>

					<Grid item xs={12} sm={6}>
						<Button variant="contained" fullWidth onClick={handleClickOnCancel}>
							<Typography>Cancelar</Typography>
						</Button>
					</Grid>
				</Grid>
			</Grid>
		</form>
	)
}
