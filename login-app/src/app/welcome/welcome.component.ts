import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {


  loggedInUsername: string = '';
  name: string = '';
  role: string = '';
  isLoading = false;
  isLoggedIn = false;
  userId!: string;
  isManager: boolean = false;

  constructor(private router: Router,
    private storageService: StorageService) {}

    ngOnInit(): void {
        this.isLoggedIn = this.storageService.isLoggedIn();

        if (this.isLoggedIn) {
          const user = this.storageService.getUser();
          console.log('user: ', user);
          this.loggedInUsername = user.userId;
          this.name = user.name || '';
          this.role = user.role || '';
          this.isManager = user.role === 'Manager';
        }

        if (this.storageService.isLoggedIn()) {
          this.isLoggedIn = true;
        }
    }
  

  logout(): void {

    try {
      this.storageService.clean();
      this.router.navigate(['/login']);
    } catch(e) {
      console.log(e);
    }
  }

}
