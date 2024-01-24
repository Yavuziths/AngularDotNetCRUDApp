import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { UserFormService } from '../user-form.service'; // Import your UserFormService
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginFormData = {
    username: '',
    password: ''
  };

  constructor(private authService: AuthService, private userFormService: UserFormService, private router: Router) {}

  ngOnInit() {}

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.authService.login(this.loginFormData.username, this.loginFormData.password).subscribe(
        (success) => {
          if (success) {
            console.log('LoginComponent: Login successful');
            this.router.navigate(['/books']);
          } else {
            console.log('LoginComponent: Login failed');
          }
        },
        (error) => {
          console.error('LoginComponent: An error occurred during login', error);
        }
      );
    }
  }

  onRegister() {
    this.router.navigate(['/register']);
  }
}
