import { withPageAuthRequired } from "@auth0/nextjs-auth0"
import { getNeighborhoods } from "@server/index"
import { Box } from "@mui/system"
import { Button, Tooltip } from "@mui/material"
import TableChartIcon from '@mui/icons-material/TableChart';
import LayersClearIcon from '@mui/icons-material/LayersClear';
import { NeighborhoodGrid } from "../../src/web/components/layout/NeighborhoodGrid"
import styled from "styled-components"
import { useSelectNeighborhood } from "../../src/web/hooks"
import { Select } from "../../src/web/components/layout"
import deleteNeighborhoodById from "../../src/web/api_calls/neighborhood/deleteNeighborhoodById";
import useUserData from "../../src/web/hooks/UseUserData";

export const Neighborhood = ({ neighborhoods }) => {

	const user = useUserData()
	
	const { 
		selectedNeighborhoodData, 
		updateSelectedNeighborhood, 
		selectedNeighborhood, 
		clearSelectedNeighborhood,
		neighborhoodsFromDB
	} = useSelectNeighborhood({ neighborhoods })

	const handleChange = (event) => {
		const value = event.target.value
		updateSelectedNeighborhood({ value });
	};

	const handleDeleteNeighborhood = async () => {
		
		if (!selectedNeighborhood || !selectedNeighborhoodData) return
		if (!confirm(`Desea eliminar el barrio ${selectedNeighborhoodData.name}?`)) return

		const id = selectedNeighborhood
		clearSelectedNeighborhood()
		await deleteNeighborhoodById(id)
	}
	
	return (
		<Page>
			<Box sx={{display: 'flex', flexDirection: 'row-reverse', gap: 5}}>
				
				<Select collection={neighborhoodsFromDB} value={selectedNeighborhood} handleChange={handleChange} />
				
				<Tooltip title='Ver Master'>
					<Button color='success' variant="contained">
						<TableChartIcon/>
					</Button>
				</Tooltip>

				{
					user.isAdmin &&
					<Tooltip title='Eliminar barrio'>
						<Button variant="contained" color="error" onClick={handleDeleteNeighborhood}>
							<LayersClearIcon/>
						</Button>
					</Tooltip>
				}
				
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