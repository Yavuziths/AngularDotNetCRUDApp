import { Routes } from '@angular/router';
import { BookListComponent } from './book-list/book-list.component';
import { BookFormComponent } from './book-form/book-form.component';
import { MyQuotesComponent } from './my-quotes/my-quotes.component';

export const appRoutes: Routes = [
  { path: 'books', component: BookListComponent },
  { path: 'add-book', component: BookFormComponent },
  { path: 'quotes', component: MyQuotesComponent },
  { path: '', redirectTo: '/books', pathMatch: 'full' }
];

export const routes: Routes = [];
