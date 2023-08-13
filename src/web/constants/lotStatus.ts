import { StatusColor, StatusOption } from "@web/domain/types/types"

export const STATUS_OPTIONS : StatusOption[] = [
    'Disponible',
    'Vendido',
    'Reservado',
    'Financiado',
    'No Disponible'
]

export const STATUS_COLORS: StatusColor = {
    Disponible: '#0af2a1',
    Vendido: '#e42929',
    Reservado: '#decc00',
    Financiado: '#a10af2',
    NoDisponible: '#f2550a'
}