import { AbstractControl } from '@angular/forms';
export class PasswordValidation {

    static MatchPassword(AC: AbstractControl): { [key: string]: any } | null {
        let password = AC.get('password').value;
        let confirmPassword = AC.get('confPassword').value;
        if (password != confirmPassword) {
            AC.get('confPassword').setErrors({ 'notEqual': true })
        } else {
            return null
        }
    }
}