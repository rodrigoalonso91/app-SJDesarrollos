import { Button, Grid, TextField, Typography } from "@mui/material"
import { useDispatch } from "react-redux"
import { useField } from "../hooks"
import { displayForm } from "../store/form"
import addRowInDatabase from "../api_calls/addRowInDatabase"

export const AddSalesmanForm = ({ collection, data, setData }) => {
	
	const firstname = useField({ type: "text" })
	const lastname = useField({ type: "text" })
	const phone = useField({ type: "text" })
	const email = useField({ type: "text" })

	const inputs = [ firstname, lastname, phone, email ]

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
