import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../models/book.model';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class BookService {
    private apiUrl = environment.apiUrl + '/books';

    constructor(private http: HttpClient) { }

    getBooks(): Observable<Book[]> {
        console.log('Fetching books from:', this.apiUrl);
        return this.http.get<Book[]>(this.apiUrl);
    }

    getBookById(id: number): Observable<Book> {
        console.log(`Fetching book with ID ${id} from:`, this.apiUrl);
        return this.http.get<Book>(`${this.apiUrl}/${id}`);
    }

    addBook(book: Book): Observable<Book> {
        console.log('Adding book:', book);
        return this.http.post<Book>(this.apiUrl, book, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        });
    }

    updateBook(id: number, book: Book): Observable<any> {
        console.log(`Updating book with ID ${id}:`, book);
        return this.http.put(`${this.apiUrl}/${id}`, book, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        });
    }

    deleteBook(id: number): Observable<any> {
        console.log(`Deleting book with ID ${id}`);
        return this.http.delete(`${this.apiUrl}/${id}`);
    }
}
