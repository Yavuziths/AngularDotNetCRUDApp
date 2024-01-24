import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BookService } from '../services/book.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Book } from '../models/book.model';

@Component({
    selector: 'app-book-form',
    templateUrl: './book-form.component.html',
    styleUrls: ['./book-form.component.css']
})
export class BookFormComponent implements OnInit {
    bookForm: FormGroup = new FormGroup({
        title: new FormControl('', Validators.required),
        author: new FormControl('', Validators.required),
        PublishDate: new FormControl('', Validators.required)
    });
    isEditMode: boolean = false;
    bookId: number = 0;

    constructor(
        private bookService: BookService,
        private router: Router,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.route.params.subscribe(params => {
            if (params['id']) {
                this.isEditMode = true;
                this.bookId = +params['id'];
                this.bookService.getBookById(this.bookId).subscribe(
                    (book: Book) => this.bookForm.patchValue(book),
                    error => console.error('Error fetching book details', error)
                );
            }
        });
    }

    onSubmit() {
        if (!this.bookForm.valid) {
            console.error('Form is invalid');
            return;
        }
        if (this.isEditMode) {
            this.bookService.updateBook(this.bookId, this.bookForm.value).subscribe(
                () => this.router.navigate(['/books']),
                error => console.error('Error updating book', error)
            );
        } else {
            this.bookService.addBook(this.bookForm.value).subscribe(
                () => this.router.navigate(['/books']),
                error => console.error('Error adding book', error)
            );
        }
    }
}
