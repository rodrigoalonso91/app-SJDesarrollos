import { PersonDbRow } from "../types/types";

export function normalizeData(data: PersonDbRow): PersonDbRow {

    data.firstname = capitalizeFirstLetter(data.firstname?.trim())
    data.lastname = capitalizeFirstLetter(data.lastname?.trim())

    return data
}

function capitalizeFirstLetter(word: string) {

    if (word.includes(' ')) {
        console.log("first")
        const words = word.split(' ')
        const capitalizedWord = words.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLocaleLowerCase()).join(' ')

        return capitalizedWord

    }
    return word?.charAt(0).toUpperCase() + word?.slice(1).toLocaleLowerCase();
}