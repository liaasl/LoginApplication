import { Component } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;
  errorMessage: string | undefined;
  hide = true;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      userId: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  onSubmit() {
    const formValue = this.loginForm.value;
    if (formValue.userId === 'user1' && formValue.password === 'abc123') {
      console.log('Login Success');
      // navigate to welcome page
    } else {
      this.errorMessage = 'Invalid userId or password';
      console.log('Login Failed');
    }
  }

}
