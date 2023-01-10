import MaterialReactTable from 'material-react-table';
import { useDispatch } from 'react-redux';
import { displayForm } from './../../../store/form'

export const SalesmenGrid = ({columns, salesmen}) => {

    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch( displayForm(true) )
    }

    return (
        <>
            <div className="contairner d-flex flex-row-reverse align-items-center">
                <button 
                    className='btn btn-primary mb-3 me-3' 
                    onClick={ handleClick }
                >
                    + Vendedor
                </button>
            </div>

            <MaterialReactTable
                columns={columns}
                data={salesmen}
                enableRowSelection
                enableColumnOrdering
                enableGlobalFilter={false} //turn off a feature
            />
        </>
    )
}