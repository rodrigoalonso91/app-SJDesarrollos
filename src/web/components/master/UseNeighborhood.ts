import transformXmlToNeighborhoods, {
	BlockError,
	Neighborhood
} from "@web/domain/TransformXmlToNeighborhoods"
import { ChangeEvent, useCallback, useState } from "react"

export default function useNeighborhood() {

	const [neighborhood, setNeighborhood] = useState<Neighborhood | null>(null)
	const [errors, setErrors] = useState<Array<BlockError> | null>(null)
	const [uploadedFile, setUploadedFile] = useState<string>('Ningún archivo selecionado')

	async function onFileUpload(e: ChangeEvent<HTMLInputElement>) {
		if (!e.target.files) return
		const file = e.target.files[0]
		setUploadedFile(file.name)
		const xml = await encode(file)

		const { neighborhood, errors } = transformXmlToNeighborhoods(xml)
		setNeighborhood(neighborhood)
		setErrors(errors)
	}

	const changeLotName = useCallback(
		({ name, block, lot }: { name: string; block: number; lot: number }) => {
			setNeighborhood((neighborhood) => {
				if (neighborhood === null) return null
				const substitute = clone(neighborhood)
				substitute.blocks[block].lots[lot].name = name
				return substitute
			})
		},
		[neighborhood]
	)

	const changeBlockName = useCallback(
		({ name, block }: { name: string; block: number }) => {
			setNeighborhood((neighborhood) => {
				if (neighborhood === null) return null
				const substitute = clone(neighborhood)
				substitute.blocks[block].name = name
				return substitute
			})
		},
		[neighborhood]
	)

	const changeNeighborhoodName = useCallback(
		(name: string) => {
			setNeighborhood((neighborhood) => {
				if (neighborhood === null) return null
				const substitute = clone(neighborhood)
				substitute.name = name
				return substitute
			})
		},
		[neighborhood]
	)

	const changeLotPrice = useCallback(
		({ price, block, lot }: { price: string; block: number; lot: number }) => {
			setNeighborhood((neighborhood) => {
				if (neighborhood === null) return null
				const substitute = clone(neighborhood)
				substitute.blocks[block].lots[lot].price = price
				return substitute
			})
		},
		[neighborhood]
	)

	return {
		onFileUpload,
		neighborhood,
		errors,
		changeNeighborhoodName,
		changeBlockName,
		changeLotName,
		changeLotPrice,
		uploadedFile
	}
}

async function encode(file: File): Promise<string> {
	const promise = new Promise<string>((resolve, reject) => {
		const reader = new FileReader()
		reader.onload = (ev) => resolve(ev.target!.result as string)
		reader.onerror = reject
		reader.readAsText(file, "UTF-8")
	})
	return await promise
}

const clone = <T>(obj: T) : T => JSON.parse(JSON.stringify(obj))
