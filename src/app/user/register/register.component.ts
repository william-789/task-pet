import { Component} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { RegisterValidators } from '../validators/register-validators';
//import { EmailTaken } from '../validators/email-taken';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent{

  constructor(
    private auth: AuthService
    //private emailTaken: EmailTaken
    ) {}

  inSubmission = false;

  name = new FormControl<string>('', {
    validators: [
    Validators.required,
    Validators.minLength(3)
    ],
    nonNullable: true
  });
  email = new FormControl<string>('', {
    validators: [
      Validators.required,
      Validators.email
    ],
    nonNullable: true
  }/*, [this.emailTaken.validate]*/);
  password = new FormControl('',{
    validators: [
    Validators.required,
    Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm)
    ],
    nonNullable: true
  });
  confirm_password = new FormControl('', {
    validators: [
    Validators.required
    ],
    nonNullable: true
  });

  showAlert = false;
  alertMessage = 'Please, wait! Your account is being created';
  alertColor = 'blue';

  registerForm = new FormGroup({
    name: this.name,
    email: this.email,
    password: this.password,
    confirm_password: this.confirm_password
  }, [RegisterValidators.match('password','confirm_password')])

  async register() {
    this.showAlert = true;
    this.alertMessage = 'Please, wait! Your account is being created';
    this.alertColor = 'blue';
    this.inSubmission = true;


    try {
      await this.auth.createUser(this.registerForm.getRawValue())

    } catch(e) {
      console.error(e);
      this.alertMessage = 'An unexpected error ocurred. Please, try again later.';
      this.alertColor = 'red';
      this.inSubmission = false;

      return;
    }
    
    this.alertMessage = 'Success! Your account has been created.';
    this.alertColor = 'green';
  }
}
