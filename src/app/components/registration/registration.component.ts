import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { CommonModule } from '@angular/common';
import { AppRoutes } from '../../constants/app-routes';
import { LoadingComponent } from '../shared/loading/loading.component';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink, LoadingComponent], // Add FormsModule here
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss',
})
export class RegistrationComponent {
  public readonly AppRoutes = AppRoutes;

  user = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    roles: [],
  };

  constructor(private authService: AuthService, private router: Router, protected loadingService: LoadingService) {}

  onSubmit() {
    console.log('User Data', this.user);
    this.loadingService.startLoading();
    this.authService.register(this.user).subscribe(
      (response: any) => {
        console.log('Register response', response);
        localStorage.setItem('token', response.data.token);
        this.loadingService.stopLoading();
        this.router.navigate(['/']);
      },
      (error) => {
        console.error('Registration failed', error);
        this.loadingService.stopLoading();
      }
    );
  }
}
