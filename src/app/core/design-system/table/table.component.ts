import { Component, ContentChild, Input, OnChanges, TemplateRef } from '@angular/core';
import { PaginationComponent } from '../pagination/pagination.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StatusBadageComponent } from '../status-badage/status-badage.component';
import { ButtonComponent } from '../button/button.component';
import { IconComponent } from '../icon/icon.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'backoffice-table',
  standalone: true,
  imports: [PaginationComponent,CommonModule,RouterModule,StatusBadageComponent,IconComponent,FormsModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent implements OnChanges{
  @Input() data: any[] = [];
  @Input() columns: TableColumn[] = [];
  @Input() actions: Action[] = [];
  paginatedData: any[] = [];
  itemsPerPage = 10;
  currentPage = 1;
  hasActions : boolean = false;
  sortedColumn: string | null = null;
  sortDirection: 'asc' | 'desc' | '' = '';
  showFilters: boolean = false;
  filteredData: any[] = [];
  sortBy: any;
  searchText: string = '';
  filters: any;
 
  getIconClassColor(label : string): string {
    return label === 'Edit' ? 'text-info' : 'text-danger';  
  }
  
  getIconClass(label : string): string {
    return label === 'Edit' ? 'bi-pencil-fill' : 'bi-trash'; 
  }

  ngOnChanges() {
    this.paginateData();
  }

  paginateData(page: number = 1) {
    const start = (page - 1) * 10;
    const end = start + 10;
    this.paginatedData = this.data.slice(start, end);
  }

  onPageChange(page: number) {
    this.paginateData(page);
  }

  // get hasActions(): boolean {
  //   return this.columns.some(column => column.type === 'actions');
  // }

   // Sort function that toggles sort direction and sorts the data
   sortColumn(column: TableColumn) {
    if (!column.sortable) return;

    if (this.sortedColumn === column.key) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortedColumn = column.key;
      this.sortDirection = 'asc';
    }

    this.paginatedData.sort((a, b) => {
      const valueA = a[column.key];
      const valueB = b[column.key];

      if (valueA < valueB) {
        return this.sortDirection === 'asc' ? -1 : 1;
      } else if (valueA > valueB) {
        return this.sortDirection === 'asc' ? 1 : -1;
      } else {
        return 0;
      }
    });
  }

  // Sort function
  sortData(): void {
    this.filteredData.sort((a, b) => {
      if (a[this.sortBy] < b[this.sortBy]) {
        return -1;
      } else if (a[this.sortBy] > b[this.sortBy]) {
        return 1;
      }
      return 0;
    });
  }

   // Search function
   searchData(): void {
    this.filteredData = this.data.filter(item => 
      item.name.toLowerCase().includes(this.searchText.toLowerCase())
    );
    this.sortData(); // Reapply sorting after search
  }

   // Toggle filters panel
   toggleFilterPanel(): void {
    this.showFilters = !this.showFilters;
  }

  // Apply filters
  applyFilters(): void {
    // Apply your filters (e.g., status)
    this.filteredData = this.data.filter(item => 
      (this.filters.status ? item.status === this.filters.status : true)
    );
    this.sortData(); // Reapply sorting after filtering
  }

}


export interface TableColumn {
  key: string,
  label: string,
  link?: string,
  type: 'text' | 'status' | 'link' | 'image' | 'actions',
  width?: string,
  height?: string,
  sortable?: boolean,
}

interface Action {
  label: string;
  icon?: string;
  class?: string;
  handler: (row: any) => void;
}