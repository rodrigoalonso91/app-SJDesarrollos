import styled from "@emotion/styled"
import Autocomplete from "@mui/material/Autocomplete"
import TextField from "@mui/material/TextField"
import MasterContext, { BasicPerson } from "@web/components/master/MasterContext"
import { STATUS_OPTIONS } from "@web/constants/lotStatus"
import { 
	BasicDataAdministrator,
	BasicDataCustomer,
	NeighborhoodLotAdministrator, 
	NeighborhoodLotCoCustomer, 
	NeighborhoodLotCustomer, 
	NeighborhoodLotSalesman, 
	NewBlockData,
	NewLotData,
	NewLotPriceData,
	NewLotStatusData,
	StatusOption
} from "@web/domain/types/types"
import { useField } from "@web/hooks"
import React, { useContext, useEffect, useRef, useState } from "react"

export default function BlockInputs () {

	const { selected, neighborhood } = useContext(MasterContext)
	const selectedItem = selected && neighborhood.blocks[selected.block].lots[selected.lot]

	return (
		<InputsContainer>
			{selected && neighborhood &&
				<>
					<LotInformation>
						<LotName
							block={selected.block}
							lot={selected.lot}
							name={selectedItem?.name || ""}
						/>

						<BlockName
							block={selected.block}
							name={neighborhood.blocks[selected.block]?.name || ""}
						/>

						<LotPrice
							price={selectedItem?.price || ""}
							block={selected.block}
							lot={selected.lot}
						/>

						<LotStatus
							status={selectedItem?.status as StatusOption || 'Disponible'}
							block={selected.block}
							lot={selected.lot}
						/>
					</LotInformation>

					<LotAdministrator
						person={selectedItem?.administrator || { id: '', fullname: '', color: '' }}
						block={selected.block}
						lot={selected.lot}
					/>
					
					<LotInformation>
						<LotCustomer
							person={selectedItem?.customer || { id: '', fullname: '' }}
							block={selected.block}
							lot={selected.lot}
						/>

						<LotCoCustomer
							person={selectedItem?.coCustomer || { id: '', fullname: '' }}
							block={selected.block}
							lot={selected.lot}
						/>
					</LotInformation>
					
					<LotSalesmen
						person={selectedItem?.salesman || { id: '', fullname: '' }}
						block={selected.block}
						lot={selected.lot}
					/>
				</>
			}
		</InputsContainer>
	)
}

const InputsContainer = styled.section`
	display: flex;
	flex-direction: column;
	gap: 15px;
`

const LotInformation = styled.div`
	display: grid;
	grid-template-columns: repeat(
      auto-fit,
      minmax(
        200px,
        1fr
      )
    );
    gap: 1rem;
`

function BlockName({ block, name }: NewBlockData) {

	const { changeBlockName } = useContext(MasterContext)
	const [text, setText] = useState(name)

	useEffect(() => { setText(name) }, [name])

	return (
		<TextField
			required
			size="medium"
			label="Manzana"
			value={text}
			onChange={(e) => setText(e.target.value)}
			onBlur={() => changeBlockName({ name: text, block })}
		/>
	)
}

function LotName({ block, lot, name }: NewLotData) {
	
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
			size="medium"
			inputRef={ref}
			label="Lote"
			value={text}
			onChange={(e) => setText(e.target.value)}
			onBlur={() => changeLotName({ name: text, lot, block })}
			onFocus={() => setSelected({ block, lot })}
		/>
	)
}

function LotPrice({ block, lot, price }: NewLotPriceData) {

	const { changeLotPrice } = useContext(MasterContext)

	const priceInput = useField({ type: "number", label: 'Precio', placeholder: undefined, text: price })

	return (
		<TextField
			size="medium"
			{...priceInput}
			onBlur={() => changeLotPrice({ price: priceInput.value, lot, block })}
		/>
	)
}

function LotStatus ({ block, lot, status }: NewLotStatusData) {
	const [updatedStatus, setUpdatedStatus] = useState(status)
	const { changeLotStatus } = useContext(MasterContext)
	
	useEffect(() => { setUpdatedStatus(status) },[status])
	
	return (
		<Autocomplete
			value={updatedStatus}
			size="medium"
			options={STATUS_OPTIONS}
			onBlur={() => changeLotStatus({ block, lot, status: updatedStatus })}
			onChange={(_e, value) => setUpdatedStatus(value || 'Disponible')}
			renderInput={(params) => <TextField {...params} label={'Estado'} />}
		/>
	)
}

function LotAdministrator ({ block, lot, person }: NeighborhoodLotAdministrator) {

	const [administrator, setAdministrator] = useState(person)
	const { changeLotAdministrator, administrators } = useContext(MasterContext)

	useEffect(() => { setAdministrator(person) },[person])

	const handleOnChange = (value: BasicDataAdministrator | null) => {
		setAdministrator(value || { id : '', fullname: '', color: '' })
	}

	return (
		<Autocomplete
			size="medium"
			value={administrator}
			getOptionLabel={(option) => option.fullname}
			options={administrators}
			onBlur={() => changeLotAdministrator({ block, lot, person : administrator })}
			onChange={(_e, value) => {
				handleOnChange(value)
			}}
			renderInput={(params) => <TextField {...params} label={'Administrador'} />}
		/>
	)
}

function LotSalesmen ({ block, lot, person }: NeighborhoodLotSalesman) {

	const [salesman, setSalesman] = useState(person)
	const { changeLotSalesman, salesmen } = useContext(MasterContext)
	
	useEffect(() => { setSalesman(person) },[person])
	
	return (
		<Autocomplete
			size="medium"
			options={salesmen}
			getOptionLabel={(option) => option.fullname}
			value={salesman}
			onBlur={() => changeLotSalesman({ block, lot, person: salesman })}
			onChange={(_e, value) => setSalesman(value || { id : '', fullname: '' })}
			renderInput={(params) => <TextField {...params} label={'Vendedor'} />}
		/>
	)
}

function LotCustomer ({ block, lot, person }: NeighborhoodLotCustomer) {

	const [customer, setCustomer] = useState<BasicDataCustomer>(person)
	const { changeLotCustomer, customers } = useContext(MasterContext)
	
	useEffect(() => { setCustomer(person) },[person])
	
	return (
		<Autocomplete
			size="medium"
			options={customers}
			getOptionLabel={(option) => option.fullname ? option.fullname : ''}
			value={customer}
			onBlur={() => changeLotCustomer({ block, lot, person: customer })}
			onChange={(_e, value) => setCustomer(value || { id: '', fullname: '' })}
			renderInput={(params) => <TextField {...params} label={'Propietario'} />}
		/>
	)
}

function LotCoCustomer ({ block, lot, person }: NeighborhoodLotCoCustomer) {

	const [coCustomer, setCoCustomer] = useState(person)
	
	const { changeLotCoCustomer, customers } = useContext(MasterContext)
	
	useEffect(() => { setCoCustomer(person) },[person])
	
	return (
		<Autocomplete
			size="medium"
			value={coCustomer}
			getOptionLabel={(option) => option.fullname ? option.fullname : ''}
			options={customers}
			onBlur={() => changeLotCoCustomer({ block, lot, person: coCustomer })}
			onChange={(_e, value) => setCoCustomer(value || { id: '', fullname: '' })}
			renderInput={(params) => <TextField {...params} label={'Co-Propietario'} />}
		/>
	)
}
