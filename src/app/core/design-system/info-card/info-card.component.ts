import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'backoffice-info-card',
  standalone: true,
  imports: [CommonModule,TranslateModule,IconComponent],
  templateUrl: './info-card.component.html',
  styleUrl: './info-card.component.scss'
})
export class InfoCardComponent {
  @Input() cardData: any;
	@Input() bgClass: string = 'background-bg-card';
	@Input() isSvg: boolean = false;
}
