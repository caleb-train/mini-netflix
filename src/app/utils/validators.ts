import { AbstractControl, ValidatorFn } from '@angular/forms';

export const validationMsg = (field='')=>({
  required: `${field} is required`,
  minlength: `${field} must have minlength of 5`,
  match: `${field} must match`,
  pattern: `${field} is not valid`
})

export const match = (...params):ValidatorFn=>{
  return (c:AbstractControl):{[key:string]: boolean} | null => {
    if(c.get(params[0]).value !== c.get(params[1]).value) return {'match': true}
    return null
  }
}
