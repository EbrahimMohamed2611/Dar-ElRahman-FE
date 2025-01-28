import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AppRoutes } from 'src/app/constants/app-routes';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  imports: [RouterLink]
})
export class SidebarComponent {
 
  public AppRoutes = AppRoutes;

}
