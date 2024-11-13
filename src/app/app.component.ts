import { Component, inject, Renderer2, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LoadingComponent } from './core/design-system/loading/loading.component';
import { SharedDataService } from './shared/services/shared-data.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    TranslateModule,
    LoadingComponent,
    CommonModule
  ],
  template: `
  <backoffice-loading [isLoading]="(isLoading | async) ?? false" [fullscreen]="true"></backoffice-loading>
  <router-outlet />
  `,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'backoffice';
  protected translate = inject(TranslateService);
  protected renderer = inject(Renderer2);
  protected sharedData = inject(SharedDataService);
  isLoading = new Observable<boolean>();
  constructor() {
    this.translate.addLangs(['en', 'ar']);
    this.translate.setDefaultLang('en');
    const browserLang = this.translate.getBrowserLang() || 'en';
    this.translate.use(browserLang);
    const bodyTag = this.renderer.selectRootElement('body', true);
    const htmlTag = this.renderer.selectRootElement('html', true);
    const dir = browserLang === 'ar' ? 'rtl' : 'ltr';
    this.renderer.setAttribute(bodyTag, 'lang', browserLang);
    this.renderer.setAttribute(bodyTag, 'dir', dir);
    this.renderer.setAttribute(htmlTag, 'lang', browserLang);
    this.renderer.setAttribute(htmlTag, 'dir', dir);

    this.isLoading = this.sharedData.isLoading as Observable<boolean>;
  }
}
