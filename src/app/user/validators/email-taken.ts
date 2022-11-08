import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AbstractControl, AsyncValidator, ValidationErrors } from "@angular/forms";

@Injectable({
    providedIn: 'root'
})
export class EmailTaken implements AsyncValidator{
    constructor(private auth: AngularFireAuth) {}

    validate = (control: AbstractControl): Promise<ValidationErrors | null> => {
        return this.auth.fetchSignInMethodsForEmail(control.value).then(
            //check if the email is already registered
            response => response.length ? { emailTaken: true } : null
        )        
    }
}
