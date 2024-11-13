import { Component } from '@angular/core';
import { navItems } from './_nav';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'backoffice-sidebar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  navItems = navItems;
}
