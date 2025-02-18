import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AppRoutes } from '../../constants/app-routes';
import { LoadingService } from 'src/app/services/loading.service';
import { LoadingComponent } from '../shared/loading/loading.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink, LoadingComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  public readonly AppRoutes = AppRoutes;

  credentials = {
    email: '',
    password: '',
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    protected loadingService: LoadingService
  ) {}

  onSubmit() {
    this.loadingService.startLoading();
    this.authService.login(this.credentials).subscribe(
      (response: any) => {
        console.log('Login response', response);
        localStorage.setItem('token', response.data.token);
        this.loadingService.stopLoading();
        this.router.navigate(['/', AppRoutes.HOME, AppRoutes.STUDENT]);
      },
      (error) => {
        console.error('Login failed', error);
        this.loadingService.stopLoading();
      }
    );
  }
}
