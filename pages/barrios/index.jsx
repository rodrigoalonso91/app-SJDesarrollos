import { withPageAuthRequired } from "@auth0/nextjs-auth0"
import { useEffect, useState } from "react"
import { getNeighborhoods } from "@server/index"
import { Box } from "@mui/system"
import { Button, MenuItem, TextField, Tooltip } from "@mui/material"
import TableChartIcon from '@mui/icons-material/TableChart';
import LayersClearIcon from '@mui/icons-material/LayersClear';
import { NeighborhoodGrid } from "../../src/web/components/layout/NeighborhoodGrid"
import styled from "styled-components"
import { useSelectNeighborhood } from "../../src/web/hooks"
import { Select } from "../../src/web/components/layout"

export const Neighborhood = ({ neighborhoods }) => {
	
	const { selectedNeighborhoodData, updateSelectedNeighborhood, selectedNeighborhood } = useSelectNeighborhood({ neighborhoods })

	const handleChange = (event) => {
		const value = event.target.value
		updateSelectedNeighborhood({ value });
	};
	
	return (
		<Page>
			<Box sx={{display: 'flex', flexDirection: 'row-reverse', gap: 5}}>
				
				<Select collection={neighborhoods} value={selectedNeighborhood} handleChange={handleChange} />
				
				<Tooltip title='Ver Master'>
					<Button color='success' variant="contained">
						<TableChartIcon/>
					</Button>
				</Tooltip>

				<Tooltip title='Eliminar barrio'>
					<Button variant="contained" color="error">
						<LayersClearIcon/>
					</Button>
				</Tooltip>
				
			</Box>
			<NeighborhoodGrid data={selectedNeighborhoodData} />
		</Page>
	)
}

export default Neighborhood

export const getServerSideProps = withPageAuthRequired({
	getServerSideProps: async () => {
		const neighborhoods = await getNeighborhoods()
		return { props: { neighborhoods } }
	}
})

const Page = styled.section`
	display: flex;
	flex-direction: column;
	justify-content: center;
	gap: 50px;
	padding: 25px
`;