import { withPageAuthRequired } from "@auth0/nextjs-auth0"
import { Button, MenuItem, TextField } from "@mui/material"
import { Box } from "@mui/system"
import { getNeighborhoods } from "@server/index"
import { useEffect, useState } from "react"
import { NeighborhoodGrid } from "../../src/web/components/layout/NeighborhoodGrid"

export const Neighborhood = ({ neighborhoods }) => {

	const [selectedNeighborhood, setSelectedNeighborhood] = useState('')
	const [neighborhoodData, setNeighborhoodData] = useState({name: '', blocks: []})

	useEffect(() => {

		if (!selectedNeighborhood) return

		const data = neighborhoods.find( n => n.id === selectedNeighborhood )
		setNeighborhoodData(data)
	},
	[neighborhoods, selectedNeighborhood])

	const handleChange = (event) => {
		setSelectedNeighborhood(event.target.value);
	};
	
	return (
		<section 
			style={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				gap: '50px',
				padding: 25
			}}
		>
			<Box sx={{display: 'flex', flexDirection: 'row-reverse', gap: 5}}>
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
				<Button variant="contained">
					Ver master
				</Button>
			</Box>

			<NeighborhoodGrid data={neighborhoodData} />
		</section>
	)
}

export default Neighborhood

export const getServerSideProps = withPageAuthRequired({
	getServerSideProps: async () => {
		const neighborhoods = await getNeighborhoods()
		return { props: { neighborhoods } }
	}
})