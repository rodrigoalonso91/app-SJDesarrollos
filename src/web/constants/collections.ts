import { ApiPathCollection, DbCollectionInSpanish } from "@web/domain/types/types"

export const SPANISH_COLLECTIONS: DbCollectionInSpanish = {
	salesmen: "Vendedores",
	clients: "Clientes",
    administrators: "Administradores"
}

export const API_PATH_COLLECTIONS: ApiPathCollection = {
    salesmen: "vendedores",
    clients: "clientes",
    neighborhoods: "barrios",
    administrators: "administradores"
}