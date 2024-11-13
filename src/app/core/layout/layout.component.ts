import { Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'backoffice-layout',
  standalone: true,
  imports: [RouterModule,SidebarComponent,FooterComponent,HeaderComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {

  sidebarActive = signal<boolean>(false);

  toggleSidebar() {
    this.sidebarActive.set(!this.sidebarActive());
  }

}
