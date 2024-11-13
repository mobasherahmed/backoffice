import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'backoffice-icon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.scss'
})
export class IconComponent {
  @Input() customClasses = '';
	@Input() icon = '';
	private _size!: number | string;
	staticSize = {
		xs: 16,
		sm: 24,
		md: 32,
		lg: 48,
	};
	@Input()
	set size(value: number | keyof typeof this.staticSize) {
		this._size = typeof value === 'number' ? value : this.staticSize[value];
	}

	get size(): number | string {
		return this._size;
	}

}
