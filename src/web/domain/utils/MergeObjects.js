export default function mergeObjects (sourceObject, targetObject) {

    // Comprobar que ambos parámetros sean objetos
    if (typeof sourceObject !== 'object' || typeof targetObject !== 'object') {
      return sourceObject;
    }
    
    // Crear un nuevo objeto para almacenar la fusión
    const merged = {};
    
    // Combinar las propiedades de ambos objetos

    for (let key in sourceObject) {

      if (Object.prototype.hasOwnProperty.call(sourceObject, key)) {

        if (targetObject[key] !== undefined && targetObject[key] !== null && targetObject[key] !== '') {

          if (typeof sourceObject[key] === 'object' && typeof targetObject[key] === 'object') {

            // Si ambas propiedades son objetos, fusionarlos recursivamente
            merged[key] = mergeObjects(sourceObject[key], targetObject[key]);
          } 
          else {

            // De lo contrario, utilizar la propiedad del segundo objeto
            merged[key] = targetObject[key];
          }
        } 
        else {
          // Si la propiedad del segundo objeto es null, undefined o texto vacío,
          // utilizar la propiedad del primer objeto
          merged[key] = sourceObject[key];
        }
      }
    }
    
    // Agregar las propiedades del segundo objeto que no están presentes en el primero
    for (let key in targetObject) {

      if (Object.prototype.hasOwnProperty.call(targetObject, key) && !Object.prototype.hasOwnProperty.call(sourceObject, key)) {

        if (targetObject[key] !== undefined && targetObject[key] !== null && targetObject[key] !== '') {
          merged[key] = targetObject[key];
        }
      }
    }

    return merged;
}