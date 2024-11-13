import { Component, inject, Renderer2, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { StorageService } from '../../../services/storage.service';
import { LangSwitcherComponent } from '../../../../shared/components/lang-switcher/lang-switcher.component';

@Component({
  selector: 'backoffice-header',
  standalone: true,
  imports: [LangSwitcherComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  private storage = inject(StorageService);
  isDropdownOpen = false;

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  logout(){
    this.storage.logout();
  }
}
