import { Component, inject, Input, Renderer2, signal, WritableSignal } from '@angular/core';
import { ButtonComponent } from '../../../core/design-system/button/button.component';
import { ButtonVariant } from '../../../core/design-system/button/variants.enum';
import { TranslateService } from '@ngx-translate/core';
import { StorageService } from '../../../core/services/storage.service';

@Component({
  selector: 'backoffice-lang-switcher',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './lang-switcher.component.html',
  styleUrl: './lang-switcher.component.scss'
})
export class LangSwitcherComponent {
ButtonVariant = ButtonVariant;
private translate = inject(TranslateService);
protected renderer = inject(Renderer2);
protected storage = inject(StorageService);
currentLang : WritableSignal<string> = signal<string>(this.translate.currentLang);
@Input() customClasses = '';

switchLang(){
  const lang = this.translate.currentLang === 'en' ? 'ar' : 'en';
  this.currentLang.set(lang);
  this.translate.use(lang);
  
  const direction = lang === 'ar' ? 'rtl' : 'ltr';
  const htmlTag = document.documentElement;
  const bodyTag = this.renderer.selectRootElement('body', true);
  
  this.renderer.setAttribute(bodyTag, 'dir', direction);
  this.renderer.setAttribute(bodyTag, 'lang', lang);
  this.renderer.setAttribute(htmlTag, 'dir', direction);
  this.renderer.setAttribute(htmlTag, 'lang', lang);
}
}
