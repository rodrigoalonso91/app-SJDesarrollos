export const NAVBAR_ITEMS = [
    {
        id: 1,
        title: 'Master',
        conditionToRender: 'admin'
    },
    {
        id: 2,
        title: 'Barrios',
        conditionToRender: 'neighborhood'
    },
    {
        id: 4,
        title: 'Vendedores',
        conditionToRender: 'admin'
    },
    {
        id: 5,
        title: 'Clientes',
        conditionToRender: 'admin'
    },
    {
        id: 3,
        title: 'Administradores',
        conditionToRender: 'admin'
    },
    {
        id: 6,
        title: 'Resumen',
        conditionToRender: 'admin'
    }
].sort((a, b) => a.id - b.id)