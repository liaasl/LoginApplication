import { Injectable } from '@angular/core';

const USER_KEY = 'auth-user';
const USER_ID = 'auth-user-id';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  clean(): void {
    window.sessionStorage.clear();
  }

  public saveUser(user: any, id: string): void {
    console.log("user, id", user, id);
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY,JSON.stringify(user));
    window.sessionStorage.removeItem(USER_ID);
    window.sessionStorage.setItem(USER_ID, JSON.stringify(id));
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);

    if (user) {
      return JSON.parse(user);
    }

    return {};
  }

  public getId(): string {
    return window.sessionStorage.getItem(USER_ID) || '';
}

  public isLoggedIn(): boolean {
    const user = window.sessionStorage.getItem(USER_KEY);

    if (user) {
      return true;
    }

    return false;
  }
}
