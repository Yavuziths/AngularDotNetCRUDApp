import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  isDarkMode = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Check local storage for dark mode preference
    const storedMode = localStorage.getItem('isDarkMode');
    if (storedMode) {
      this.isDarkMode = JSON.parse(storedMode);
      this.applyDarkModeStyles(); // Apply styles based on the initial mode
    }
  }

  isAuthenticated(): boolean {
    // Use your authService or any method to check if the user is authenticated
    return this.authService.isAuthenticated();
  }

  logout(): void {
    // Use your authService to logout
    this.authService.logout();

    // After logging out, you can navigate to the login page or any other appropriate page
    this.router.navigate(['/login']);
  }

  toggleDarkMode(): void {
    this.isDarkMode = !this.isDarkMode;

    this.applyDarkModeStyles();

    localStorage.setItem('isDarkMode', JSON.stringify(this.isDarkMode));
  }

  private applyDarkModeStyles(): void {
    if (this.isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }
}
