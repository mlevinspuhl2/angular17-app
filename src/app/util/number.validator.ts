import { AbstractControl, ValidationErrors } from '@angular/forms';

export class NumberValidator {
  static greaterZero(control: AbstractControl): ValidationErrors | null {
    if ((control.value || 0) > 0) {
      return { greaterZero: true }
    }

    return null;
  }
}  
