/**
 * Removes empty objects from the given list.
 *
 * @param {object[]} list - The list of objects to filter.
 * @return {object[]} The filtered list without empty objects.
 */
function removeEmptyObjects({ list }) {
    
    return list.filter(object => {
        for (let key in object) {
            if (object[key] !== '') {
                return true
            }
        }
        return false
    })
}

/**
 * Parses CSV data and converts it into an array of person data objects.
 *
 * @param {Object} csvData - The CSV data to be parsed.
 * @return {Array} An array of person data objects.
 */
export function parseCSVToPersonData({ csvData }) {

    const translate = {
        nombre: "firstname",
        apellido: "lastname",
        telefono: "phone",
        email: "email",
        empresa: "company",
    }

    const headers = csvData.shift().split(',').map(item => translate[item.trim().toLowerCase()]).filter(item => item)

    const person = csvData.map((item) => {
        const values = item.split(',').map(item => item.trim())
        const row = {}
        for (let i = 0; i < headers.length; i++) {
            row[headers[i]] = values[i]
        }
        return row
    })

    return removeEmptyObjects({ list: person })
}

/**
 * Reads a CSV file and returns its contents as a string.
 *
 * @param {File} file - The CSV file to be read.
 * @return {Promise<string>} A Promise that resolves with the contents of the CSV file as a string.
 */
export function readCSVFile({ file }) {

    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result)
        reader.onerror = (e) => reject(e.target.error)
        reader.readAsText(file);
    });
}