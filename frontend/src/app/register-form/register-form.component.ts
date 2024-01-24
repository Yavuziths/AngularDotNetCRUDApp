import { Component } from '@angular/core';
import { UserFormService } from '../user-form.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html', // Update the template URL
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent {
  user = {
    username: '',
    password: '',
    email: ''
  };
  registrationError: string | null = null;
  registrationSuccess: string | null = null;

  constructor(private userService: UserFormService, private router: Router) {}


  onSubmit() {
    // Clear previous messages
    this.registrationError = null;
    this.registrationSuccess = null;

    // Send registration request to the server
    this.userService.registerUser(this.user).subscribe(
      () => {
        // Registration successful
        this.registrationSuccess = 'User registered successfully.';
        this.router.navigate(['/login']);
      },
      (error) => {
        // Registration failed, display error message
        this.registrationError = error.error || 'Registration failed. Please try again.';
      }
    );
  }
}
