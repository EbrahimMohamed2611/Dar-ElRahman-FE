import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { APP_ROUTES } from './app/app-routing';
import { importProvidersFrom } from '@angular/core';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { httpInterceptorProviders } from './app/core/http/auth-handler-interceptor';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideNativeDateAdapter } from '@angular/material/core';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(BrowserModule, RouterModule.forRoot(APP_ROUTES)),
    httpInterceptorProviders,
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimations(), 
    provideAnimationsAsync(),
    provideNativeDateAdapter()
  ],
}).catch((err) => console.error(err));
