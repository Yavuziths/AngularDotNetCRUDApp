import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<boolean> {
    return this.http.post<any>(`${this.apiUrl}/auth/login`, { username, password }).pipe(
      map((response) => {
        const token = response.token;
        if (token) {
          localStorage.setItem('token', token);
          return true;
        } else {
          return false;
        }
      }),
      catchError((error) => {
        console.error('Authentication failed:', error);
        return of(false);
      })
    );
  }

  logout(): void {
    // Implement logout logic here (e.g., clearing the stored token)
    localStorage.removeItem('token');
  }

  isAuthenticated(): boolean {
    // Check if the user is authenticated (e.g., check if a token exists)
    return !!localStorage.getItem('token');
  }

  getCurrentUserId(): number | null {
    // Retrieve the token from local storage
    const token = localStorage.getItem('token');
    if (token) {
      try {
        // Decode the token using JSON.parse
        const payload = JSON.parse(atob(token.split('.')[1]));
        // Extract the user ID from the payload
        const userId = payload.userId;
        if (userId) {
          return userId;
        }
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
    // Return null if no valid token or user ID is found
    return null;
  }
}
