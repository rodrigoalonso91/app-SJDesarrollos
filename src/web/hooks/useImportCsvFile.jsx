import { parseCSVToPersonData, readCSVFile } from "../domain/utils/CsvUtils"
import usePersonGrid from "./usePersonGrid"
import addPersonToDatabase from "../api_calls/addPersonToDatabase"

/**
 * A hook that handles the import of a CSV file and adds the people from the CSV file to the database and the grid data context.
 *
 * @return onFileUpload function
 */
export default function useImportCsvFile() {

    const { addManyPeopleToDataSource, tableLoading } = usePersonGrid()
    const { enableLoading, disableLoading } = tableLoading

    const onFileUpload = async (event) => {
        
        if (!event.target.files || event.target.files.length === 0) return;
    
        const file = event.target.files[0]
    
        if (file.size === 0) {
            alert('El archivo esta vacio')
            return
        }
        
        enableLoading()
        const response = await readCSVFile({ file })
        const data = response.split('\n')

        const peopleFromCsvSheet = parseCSVToPersonData({ csvData: data })
    
        const newPeople = []
        for (const person of peopleFromCsvSheet) {
            const row = {
                firstname: person.firstname.trim(),
                lastname: person.lastname.trim(),
                phone: person.phone.trim(),
                email: person.email.trim(),
                company: person.company.trim()
            }
            const { id } = await addPersonToDatabase('clients', row)

            newPeople.push({ id, ...row })
        }
        addManyPeopleToDataSource(newPeople)
        disableLoading()
    }

    return {
        onFileUpload
    }
}
