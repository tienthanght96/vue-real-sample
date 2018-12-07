export function getErrors(error){
  const errs = [];
  if(error && typeof error === 'object'){
    for (const key in error) {
      if (error.hasOwnProperty(key)) {
        errs.push(key + ' ' +error[key]);
      }
    }
  }
  return errs;
}