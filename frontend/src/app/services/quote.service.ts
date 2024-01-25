import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Quote } from '../models/quote.model';

@Injectable({
  providedIn: 'root'
})
export class QuoteService {
  private apiUrl = 'https://my-angular-app-1628f29e665e.herokuapp.com/api/quotes'; // Update with your API URL

  constructor(private http: HttpClient) {}

  deleteQuote(quoteId: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    return this.http.delete(`${this.apiUrl}/${quoteId}`, { headers });
  }

  getQuotesForUser(userId: number): Observable<Quote[]> {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<Quote[]>(`https://my-angular-app-1628f29e665e.herokuapp.com/api/quotes/user/${userId}`, { headers });
  }
}
