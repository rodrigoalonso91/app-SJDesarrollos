import styled from "@emotion/styled"
import MasterContext from "@web/components/master/MasterContext"
import { useField } from "@web/hooks"
import React, { useContext, useEffect, useRef, useState } from "react"

export default function BlockInputs() {
	const { selected, neighborhood } = useContext(MasterContext)

	if (selected === null) return null
	if (neighborhood === null) return null

	return (
		<ButtonsContainer>
			<span>Manzana</span>
			<BlockName
				block={selected.block}
				name={neighborhood.blocks[selected.block].name || ""}
			/>
			
			<span>Lotes</span>
			{neighborhood.blocks[selected.block].lots.map((lot, i) => (
				<React.Fragment key={`${selected.block}-${i}`}>
					<LotName
						block={selected.block}
						lot={i}
						name={neighborhood.blocks[selected.block].lots[i].name || ""}
					/>
					<LotPrice
						price={neighborhood.blocks[selected.block].lots[i].price || ""}
						block={selected.block}
						lot={i}

					/>
				</React.Fragment>
			))}
		</ButtonsContainer>
	)	
}

const ButtonsContainer = styled.div`
	display: flex;
	flex-direction: column;
`

function BlockName({ block, name }: { block: number; name: string }) {
	const { changeBlockName, setSelected } = useContext(MasterContext)
	const [text, setText] = useState(name)

	useEffect(() => {
		setText(name)
	}, [name])

	return (
		<NameInput
			placeholder="Manzana"
			value={text}
			onChange={(e) => setText(e.target.value)}
			onBlur={() => changeBlockName({ name: text, block })}
			onFocus={() => setSelected({ block, lot: null })}
		/>
	)
}

function LotName({
	block,
	lot,
	name
}: {
	block: number
	lot: number
	name: string
}) {
	const { changeLotName, setSelected, selected } = useContext(MasterContext)
	const [text, setText] = useState(name)
	const ref = useRef<HTMLInputElement>(null)

	useEffect(() => {
		setText(name)
	}, [name])

	useEffect(() => {
		if (selected?.block === block && selected?.lot === lot) {
			ref.current?.select()
		}
	}, [selected, block, lot])

	return (
		<NameInput
			ref={ref}
			placeholder="Lote"
			value={text}
			onChange={(e) => setText(e.target.value)}
			onBlur={() => changeLotName({ name: text, lot, block })}
			onFocus={() => setSelected({ block, lot })}
		/>
	)
}

function LotPrice({
	block,
	lot,
	price
}: {
	block: number
	lot: number
	price: string
}) {

	const { changeLotPrice, setSelected, selected } = useContext(MasterContext)

	const priceInput = useField({ type: "number", placeholder: 'Precio', label: undefined, text: price })

	return (
		<NameInput
			{...priceInput}
			onBlur={() => changeLotPrice({ price: priceInput.value, lot, block })}
		/>
	)
}

const NameInput = styled.input`
	background-color: white;
	color: black;

	:focus {
		background-color: lightblue;
	}
`
