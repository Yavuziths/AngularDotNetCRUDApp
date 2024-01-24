import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserFormService {
  private apiUrl = 'https://localhost:7221/api'; // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  registerUser(userData: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/register`, userData, { responseType: 'text' as 'json' });
  }
  // You can add more user-related methods here, such as login, update profile, etc.
}
