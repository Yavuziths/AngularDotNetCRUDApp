import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { QuoteService } from '../services/quote.service'; // Import QuoteService
import { Quote } from '../models/quote.model'; // Import your Quote model

@Component({
  selector: 'app-my-quotes',
  templateUrl: './my-quotes.component.html',
  styleUrls: ['./my-quotes.component.css']
})
export class MyQuotesComponent implements OnInit {
  myQuotes: Quote[] = [];
  newQuote: Quote = { id: 0, text: '', author: '', userId: 0 };

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private quoteService: QuoteService // Inject QuoteService
  ) {}

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      const userId = this.getCurrentUserId();
      if (userId !== null) {
        this.fetchUserQuotes(userId);
      }
    } else {
      // Handle the case where the user is not authenticated (e.g., display a message or redirect to login)
    }
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

  fetchUserQuotes(userId: number): void {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return;
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.http.get<Quote[]>(`https://my-angular-app-1628f29e665e.herokuapp.com/api/quotes/user/${userId}`, { headers })
      .subscribe((quotes) => {
        this.myQuotes = quotes;
      });
  }

  addQuote(): void {
    if (this.authService.isAuthenticated()) {
      const userId = this.authService.getCurrentUserId();
      if (userId !== null) {
        this.newQuote.userId = userId;

        const token = localStorage.getItem('token');
        if (!token) {
          console.error('No token found');
          return;
        }

        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`
        });

        this.http.post('https://my-angular-app-1628f29e665e.herokuapp.com/api/quotes', this.newQuote, { headers })
          .subscribe(() => {
            // Clear the input fields and refresh the quotes list
            this.newQuote = { id: 0, text: '', author: '', userId: 0 };
            this.fetchUserQuotes(userId);
          });
      } else {
        console.error('User ID is null');
      }
    } else {
      console.error('User is not authenticated');
    }
  }

  deleteQuote(quoteId: number): void {
    if (confirm("Are you sure you want to delete this quote?")) {
      this.quoteService.deleteQuote(quoteId).subscribe(() => {
        this.myQuotes = this.myQuotes.filter(q => q.id !== quoteId);
      });
    }
  }
}
