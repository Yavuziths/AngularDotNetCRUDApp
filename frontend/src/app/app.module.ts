import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes'; // Import your routes here
import { BookListComponent } from './book-list/book-list.component';
import { BookFormComponent } from './book-form/book-form.component';
import { MyQuotesComponent } from './my-quotes/my-quotes.component';

@NgModule({
  declarations: [
    AppComponent,
    BookListComponent,
    BookFormComponent,
    MyQuotesComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes) // Configure routes here
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
