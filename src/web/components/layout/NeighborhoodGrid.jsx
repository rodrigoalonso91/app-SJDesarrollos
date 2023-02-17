import MaterialReactTable from "material-react-table"
import { useGridTitle } from '../../hooks/'

const NEIGBORHOOD_COLUMS = [
    { header: 'Manzana', accessorKey: 'name' },
    { header: 'Lote', accessorKey: 'lot' },
    { header: 'Precio', accessorKey: 'price' }
];

export const NeighborhoodGrid = ({ data }) => {

    const { name, blocks } = data
    const { getGridTitle } = useGridTitle(name)

    const dataSource = blocks.flatMap( block => {
        return block.lots.map( lt => { 
            return { name: block.name, lot: lt.name, price: '$100' }
        })
    })

    return (
        <MaterialReactTable 
            renderTopToolbarCustomActions={getGridTitle}
            columns={NEIGBORHOOD_COLUMS}
            data={dataSource}
        />
    )
}