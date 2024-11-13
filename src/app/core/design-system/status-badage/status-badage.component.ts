import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'backoffice-status-badage',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './status-badage.component.html',
  styleUrl: './status-badage.component.scss'
})
export class StatusBadageComponent {
  @Input() status: string = 'Pending'; // Default status
  
  getStatusClass(): string {
    switch (this.status.toLowerCase()) {
      case 'pending':
        return 'badge badge-pending';
      case 'active':
        return 'badge badge-active';
      case 'inactive':
        return 'badge badge-inactive';
      default:
        return 'badge badge-default';
    }
  }

}
