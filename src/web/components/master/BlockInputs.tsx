import styled from "@emotion/styled"
import Autocomplete from "@mui/material/Autocomplete"
import TextField from "@mui/material/TextField"
import MasterContext from "@web/components/master/MasterContext"
import { STATUS_OPTIONS } from "@web/constants/lotStatus"
import { useField } from "@web/hooks"
import React, { useContext, useEffect, useRef, useState } from "react"

export default function BlockInputs () {

	const { selected, neighborhood } = useContext(MasterContext)

	if (selected === null) return null
	if (neighborhood === null) return null

	return (
		<InputsContainer>
			<BlockName
				block={selected.block}
				name={neighborhood.blocks[selected.block].name || ""}
			/>

			<LotName
				block={selected.block}
				lot={selected.lot}
				name={neighborhood.blocks[selected.block].lots[selected.lot].name || ""}
			/>

			<LotPrice
				price={neighborhood.blocks[selected.block].lots[selected.lot].price || ""}
				block={selected.block}
				lot={selected.lot}

			/>

			{/* TODO: Lot Status */}
			<LotStatus
				initialStatus={neighborhood.blocks[selected.block].lots[selected.lot].status || 'Disponible'}
				block={selected.block}
				lot={selected.lot}
			/>

			{/* TODO: Lot Customer */}

			{/* TODO: Lot Salesman */}

		</InputsContainer>
	)
}

const InputsContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 10px;
`

function BlockName({ block, name }: { block: number; name: string }) {

	const { changeBlockName, setSelected } = useContext(MasterContext)
	const [text, setText] = useState(name)

	useEffect(() => { setText(name) }, [name])

	return (
		<TextField
			required
			size="small"
			label="Manzana"
			value={text}
			onChange={(e) => setText(e.target.value)}
			onBlur={() => changeBlockName({ name: text, block })}
		/>
	)
}

function LotName({ block, lot, name }: { block: number, lot: number, name: string }) {
	
	const { changeLotName, setSelected, selected } = useContext(MasterContext)
	const [text, setText] = useState(name)
	const ref = useRef<HTMLInputElement>(null)

	useEffect(() => { setText(name) }, [name])

	useEffect(() => {
		if (selected?.block === block && selected?.lot === lot) {
			ref.current?.select()
		}
	}, [selected, block, lot])

	return (
		<TextField
			required
			size="small"
			inputRef={ref}
			label="Lote"
			value={text}
			onChange={(e) => setText(e.target.value)}
			onBlur={() => changeLotName({ name: text, lot, block })}
			onFocus={() => setSelected({ block, lot })}
		/>
	)
}

function LotPrice({ block, lot, price }: { block: number, lot: number, price: string }) {

	const { changeLotPrice, setSelected, selected } = useContext(MasterContext)

	const priceInput = useField({ type: "number", label: 'Precio', placeholder: undefined, text: price })

	return (
		<TextField
			size="small"
			{...priceInput}
			onBlur={() => changeLotPrice({ price: priceInput.value, lot, block })}
		/>
	)
}

function LotStatus ({ block, lot, initialStatus }: { block: number, lot: number, initialStatus: string }) {

	
	const [status, setStatus] = useState(initialStatus)
	const { changeLotStatus } = useContext(MasterContext)
	
	useEffect(() => { setStatus(initialStatus) },[initialStatus])
	
	return (
		<Autocomplete
			value={status}
			size="small"
			options={STATUS_OPTIONS}
			onBlur={() => changeLotStatus({ block, lot, status })}
			onChange={(e, value) => setStatus(value || 'Disponible')}
			renderInput={(params) => <TextField {...params} label={'Estado'} />}
		/>
	)
}