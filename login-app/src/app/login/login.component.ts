import { Component } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;
  errorMessage: string | undefined;
  hide = true;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {
    this.loginForm = this.fb.group({
      userId: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  onSubmit() {
    this.authService.login(this.loginForm.value.userId, this.loginForm.value.password)
      .subscribe(
        user => {
          console.log('Login successful', user);
          // navigate to the welcome page
          this.router.navigate(['/welcome']);
        },
        error => {
          console.error('Login failed', error);
          this.errorMessage = 'Invalid userId or password';
        }
      );
  }

}
