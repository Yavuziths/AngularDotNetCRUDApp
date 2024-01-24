import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from '../services/book.service';
import { Book } from '../models/book.model';
import { AppComponent } from '../app.component';

@Component({
    selector: 'app-book-list',
    templateUrl: './book-list.component.html',
    styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
    @Input() isDarkMode = false;
    books: Book[] = [];

    constructor(private bookService: BookService, private router: Router) {}

    ngOnInit() {
        this.fetchBooks();
    }

    fetchBooks() {
        this.bookService.getBooks().subscribe(
            data => this.books = data,
            error => console.error('There was an error!', error)
        );
    }

    deleteBook(id: number) {
        const confirmDelete = confirm('Are you sure you want to delete this book?');
        if (confirmDelete) {
            this.bookService.deleteBook(id).subscribe(
                () => {
                    console.log('Book deleted successfully');
                    this.fetchBooks(); // Refresh the book list after deletion
                },
                error => console.error('Error deleting book', error)
            );
        }
    }

    addBook() {
        this.router.navigate(['/add-book']); // Update with the correct route
    }

    editBook(id: number) {
        // Navigate to the book form with the book's ID as a parameter
        this.router.navigate(['/book-form', id]); // Update with the correct route
    }
}
