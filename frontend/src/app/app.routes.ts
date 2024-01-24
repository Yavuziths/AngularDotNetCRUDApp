import { Routes } from '@angular/router';
import { BookListComponent } from './book-list/book-list.component';
import { BookFormComponent } from './book-form/book-form.component';
import { MyQuotesComponent } from './my-quotes/my-quotes.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './services/auth.guard';
import { RegisterFormComponent } from './register-form/register-form.component';

export const appRoutes: Routes = [
  // Add a guard to the default route and other routes that require authentication
  { path: 'books', component: BookListComponent, canActivate: [AuthGuard] },
  { path: 'add-book', component: BookFormComponent, canActivate: [AuthGuard] },
  { path: 'book-form/:id', component: BookFormComponent, canActivate: [AuthGuard] },
  { path: 'quotes', component: MyQuotesComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterFormComponent },
  { path: '', canActivate: [AuthGuard], children: [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
  ]}
];

export const routes: Routes = [];
