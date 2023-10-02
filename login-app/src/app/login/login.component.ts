import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { StorageService } from '../storage.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  errorMessage: string | undefined;
  hide = true;
  isLoggedIn = false;
  isLoginFailed = false;
  currentUser: any;
  userId!: string;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService,
  private storageService: StorageService) {
    this.loginForm = this.fb.group({
      userId: ['', Validators.required],
      password: ['', Validators.required]
    })
  }
  ngOnInit(): void {
    this.currentUser = this.storageService.getUser();
    this.isLoggedIn = this.storageService.isLoggedIn();

    if (this.isLoggedIn) {
      this.userId = this.currentUser.userId;
    }

    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
    }
  }

  onSubmit() {
    // Performing login request
    firstValueFrom(
      this.authService.login(this.loginForm.value.userId, this.loginForm.value.password)
    )
    .then(user => {
      console.log('Login successful', user);
      
      // check for successful login response
      if (user && user.id) { 
        this.isLoginFailed = false;
        this.isLoggedIn = true;

  
        // store user data in variable
        const loggedInUser = { userId: user.userId, name: user.name, role: user.role}

        // update storage service with logedInUser's data
        this.storageService.saveUser(loggedInUser, user.id.toString());
  
        // display alert for loggedInUser
        alert(loggedInUser.userId + ' is logged in.')
        
        setTimeout(() => {
          this.reloadPage();
        }, 1000);
  
        // redirect to the welcome page
        this.router.navigate(['/welcome']);
      } else {
        console.log("Error");
        this.errorMessage = 'Invalid userid or password';
        this.isLoginFailed = true;
      }
    })
    .catch(error => {
      console.error('Login failed', error);
      this.errorMessage = 'Invalid userid or password';
      this.isLoginFailed = true;
    });
  }

  reloadPage(): void {
    // window.location.reload();
  }

}
