import MaterialReactTable from 'material-react-table';
import { useState } from 'react';
import { SalesForm } from './SalesForm';

export const SalesmenGrid = ({columns, salesmen}) => {

        // const handleClick = async () => {

    //     await fetch(`/api/salesmens`, { method: "POST", body: JSON.stringify({
    //         firstname: 'Rodrigo',
    //         lastname: 'Alonso',
    //         phone: '123456',
    //         email: 'rodrigo@email.com'
    //     })})
    // };

    const [isFormActive, setIsFormActive] = useState(false)

    const handleClick = () => {
        setIsFormActive(!isFormActive);
    }

    return (
        <>
            <div className="contairner d-flex flex-row-reverse align-items-center">
                <button 
                    className='btn btn-primary mb-3 me-3' 
                    onClick={handleClick}
                >
                    {isFormActive ? 'X' : '+ Vendedor'}
                </button>
            </div>

            {
                isFormActive 
                ? (
                    <SalesForm/>
                )
                : (
                    <MaterialReactTable
                        columns={columns}
                        data={salesmen}
                        enableRowSelection
                        enableColumnOrdering
                        enableGlobalFilter={false} //turn off a feature
                    />
                )
            }
        </>
    )
}