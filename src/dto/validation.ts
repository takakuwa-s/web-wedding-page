export interface Validation {
  isValid: boolean;
  isInvalid: boolean;
}

export function initValidation(): Validation {
  return {
    isValid: false,
    isInvalid: false
  }
}