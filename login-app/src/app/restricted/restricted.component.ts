import { Component } from '@angular/core';
import { StorageService } from '../storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-restricted',
  templateUrl: './restricted.component.html',
  styleUrls: ['./restricted.component.css']
})
export class RestrictedComponent {

  constructor(private storageService: StorageService, private router: Router) {}

  back() {
    this.router.navigate(['/welcome']);
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
