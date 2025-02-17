import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { AppRoutes } from 'src/app/constants/app-routes';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  imports: [RouterModule, RouterLink, RouterLinkActive],
})
export class SidebarComponent {
  public readonly AppRoutes = AppRoutes;
  constructor(protected authService: AuthService) {
    // this.router.events.subscribe(event => console.log(this.router.url));
  }
}
