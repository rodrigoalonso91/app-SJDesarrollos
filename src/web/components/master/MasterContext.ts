import React from "react"

const MasterContext = React.createContext<MasterContextProps>({
	setSelected: () => {},
	selected: null
})

type MasterContextProps = {
	setSelected: (_: SelectedLot) => void
	selected: SelectedLot | null
}

export default MasterContext

export type SelectedLot = { block: number; lot: number }
