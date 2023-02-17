import { withPageAuthRequired } from "@auth0/nextjs-auth0"
import { MenuItem, TextField } from "@mui/material"
import { Box } from "@mui/system"
import { getNeighborhoods } from "@server/index"
import { useState } from "react"

export const Neighborhood = ({ neighborhoods }) => {

	const [selectedNeighborhood, setSelectedNeighborhood] = useState('')

	const handleChange = (event) => {
		setSelectedNeighborhood(event.target.value);
	};
	
	return (
		<Box width='250px'>
			<TextField
			  label='Elige un barrio'
			  select
			  value={selectedNeighborhood}
			  onChange={handleChange}
			  fullWidth
			>
				{
					neighborhoods.map(n => 
						<MenuItem  
							key={n.id} 
							value={n.id} 
						>
							{n.name}
						</MenuItem>
					)
				}
			</TextField>
		</Box>
	)
}

export default Neighborhood

export const getServerSideProps = withPageAuthRequired({
	getServerSideProps: async () => {
		const neighborhoods = await getNeighborhoods()
		return { props: { neighborhoods } }
	}
})