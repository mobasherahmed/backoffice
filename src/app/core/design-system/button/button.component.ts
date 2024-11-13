import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IconComponent } from '../icon/icon.component';
import { LoadingComponent } from '../loading/loading.component';
import { Alignment } from './alignment.enum';
import { ButtonSizes } from './sizes.enum';
import { ButtonVariant } from './variants.enum';

@Component({
  selector: 'backoffice-button',
  standalone: true,
  imports: [CommonModule, IconComponent,LoadingComponent],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
	@Input() text!: string;
	@Input() disabled: boolean = false;
	@Input() iconSize: 'xs' | 'sm' | 'md' | 'lg' | number = 'xs';
	@Input() startIcon!: string;
	@Input() endIcon!: string;
	@Input() contentAlignment: Alignment = Alignment.Center;
	@Input() size: ButtonSizes = ButtonSizes.Medium;
	@Input() variant: ButtonVariant = ButtonVariant.Primary;
	@Input() customClasses = '';
	@Output() onClick = new EventEmitter<void>();
	@Input() type: 'submit' | 'button' = 'button';
	@Input() isLoading: boolean = false;

	buttonClicked() {
		this.onClick.emit();
	}
}
