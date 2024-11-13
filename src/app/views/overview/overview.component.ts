import { Component } from '@angular/core';
import { TableColumn, TableComponent } from '../../core/design-system/table/table.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'backoffice-overview',
  standalone: true,
  imports: [TableComponent, CommonModule],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss'
})
export class OverviewComponent {
  sampleData = [
    { id: 1, name: 'Alice', age: 24, status: 'pending' },
    { id: 2, name: 'Bob', age: 30, status: 'active' },
    { id: 3, name: 'Charlie', age: 28, status: 'active' },
    { id: 4, name: 'Diana', age: 35, status: 'active' },
    { id: 5, name: 'Evan', age: 22, status: 'active' },
    { id: 6, name: 'Fiona', age: 27, status: 'active' },
    { id: 7, name: 'George', age: 29, status: 'active' },
    { id: 8, name: 'Hannah', age: 26, status: 'active' },
    { id: 9, name: 'Ian', age: 32, status: 'active' },
    { id: 10, name: 'Jill', age: 23, status: 'active' },
    { id: 11, name: 'Kyle', age: 25, status: 'active' }
  ];

  columns: TableColumn[] = [
    { label: 'ID', key: 'id',type: 'text', sortable: true },
    { label: 'Name', key: 'name',type: 'text', sortable: true },
    { label: 'Age', key: 'age',type: 'text', sortable: true },
    { label: 'Status', key: 'status',type: 'status' },
    { label: 'Actions', key: 'actions',type: 'actions' },
  ];

  tableActions = [
    { label: 'Edit', handler: (row : any) => this.editRow(row) },
    { label: 'Delete', handler: (row : any) => this.deleteRow(row) },
  ];

  editRow(row: any): void {
    console.log('Editing row:', row);
  }

  deleteRow(row: any): void {
    console.log('Deleting row:', row);
  }

}
