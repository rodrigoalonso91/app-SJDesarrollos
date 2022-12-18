import { getSalesmanByName } from "../../src/GetSalesmanByName"

const Salesman = ({salesman}) => {

    console.log(salesman)
    return (
        <h1>{salesman.lastname}</h1>
    )
}

// agregar auth
export const getServerSideProps = async ({ params: {name} }) => {

    const salesman = await getSalesmanByName(name);
    
    return {
        props: { salesman }
    }
}

export default Salesman
