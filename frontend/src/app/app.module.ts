import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule,} from '@angular/forms'; // Import FormsModule
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { BookListComponent } from './book-list/book-list.component';
import { BookFormComponent } from './book-form/book-form.component';
import { MyQuotesComponent } from './my-quotes/my-quotes.component';
import { LoginComponent } from './login/login.component';
import { RegisterFormComponent } from './register-form/register-form.component';



@NgModule({
  declarations: [
    AppComponent,
    BookListComponent,
    BookFormComponent,
    MyQuotesComponent,
    LoginComponent,
    RegisterFormComponent,
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
