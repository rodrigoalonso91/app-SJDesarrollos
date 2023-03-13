export default function mergeObjects (sourceObject, targetObject) {

    if (typeof sourceObject !== "object" || typeof targetObject !== "object") {
        throw new Error("Some parameter is not an object")
    }

    const merged = {}

    for (const key in sourceObject) {

        if (Object.hasOwnProperty.call(object, key)) {
            
            for (const key in sourceObject) {

                if (!targetObject[key]) {
                    merged[key] = sourceObject[key]
                    continue
                }
                
                const isPropertyAnArray = Array.isArray(sourceObject[key]) && Array.isArray(targetObject[key])
        
                if (isPropertyAnArray) {
        
                    const mergedArray = targetObject[key].map((currentTarget, index) => {
                        return mergeObjects(sourceObject[key][index], currentTarget)
                    })
                    merged[key] = mergedArray
                }
                else if (typeof sourceObject[key] === "object" && typeof targetObject[key] === "object") {
                    merged[key] = mergeObjects(sourceObject[key], targetObject[key]);
                }
                else {
                    merged[key] = targetObject[key];
                }
            }
        }
    }

    return merged
}