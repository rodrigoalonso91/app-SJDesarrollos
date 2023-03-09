import useCollection from "./useCollection"

export function useSalesmen () {

    const { options, loading } = useCollection({ collection: 'salesmen' })

    return {
        salesmenCollection: options,
        isSalesmenLoading: loading
    }
}