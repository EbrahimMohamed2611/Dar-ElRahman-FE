import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';
import { CommonModule } from '@angular/common';
import { APP_ROUTES } from './app-routing';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [RouterOutlet, HeaderComponent, SidebarComponent, CommonModule],
})
export class AppComponent implements OnInit {
  title = 'Dar-ElRahman';
  isLoggedIn$: Observable<boolean> | undefined;

  constructor(private authService: AuthService, private router: Router) {
    // this.router.events.subscribe((event) => console.log(this.router.url));
  }

  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn();
  }

  // get paginatedData() {
  //   const startIndex = (this.currentPage - 1) * this.itemsPerPage;
  //   const endIndex = startIndex + this.itemsPerPage;
  //   return this.data.slice(startIndex, endIndex);
  // }

  // handlePageChange(newPage: number) {
  //   this.currentPage = newPage;
  // }

  // // Total pages calculation
  // get totalPages(): number {
  //   return Math.ceil(this.data.length / this.itemsPerPage);
  // }

  // handleRowSelection(row: any) {
  //   this.selectedUser = row; // Update the selected user data
  // }
}
