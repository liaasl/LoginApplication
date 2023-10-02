import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:4000';

  constructor(private http: HttpClient) { }

  login(userId: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, {userId, password});
  }

}
