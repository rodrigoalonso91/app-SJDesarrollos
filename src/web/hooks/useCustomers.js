import useCollection from "./useCollection"

export function useCustomers () {

    const { options, loading } = useCollection({ collection: 'clients' })

    return {
        clientsCollection: options,
        isClientLoading: loading
    }
}
