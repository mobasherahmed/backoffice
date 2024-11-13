import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'backoffice-loading',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.scss'
})
export class LoadingComponent {
  @Input() isLoading: boolean = false;
  @Input() loadingText: string = 'Loading...';
  @Input() fullscreen: boolean = false;
  @Input() buttonLoader: boolean = false;
}
