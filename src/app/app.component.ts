import { Component } from '@angular/core';
import { AutoCompleteComponent } from './shared/auto-complete.component';


@Component({
  selector: 'app-root',
  template: `
  <div style="text-align:center">
    <h1>
      Welcome to {{ title }}!
    </h1>
    <p>City column and Accommodation column are editable.  Id column gets its value from the selection in editing City column.</p>
  </div>

  <ag-grid-angular 
    style="height: 300px; width: 600px;" 
    class="ag-theme-balham"
    [rowData]="rowData" 
    [columnDefs]="columnDefs"
    [frameworkComponents]="frameworkComponents"
    (gridReady)="onGridReady($event)"
    (cellEditingStopped)="cellEditingStopped($event)"
    >
  </ag-grid-angular>`,
  styles: [``]
})
export class AppComponent {
  title = 'ag-Grid auto-complete';
  private gridApi;
  private frameworkComponents;
  
  constructor() {
    this.frameworkComponents = {
      autoComplete: AutoCompleteComponent,
    };

  }

  columnDefs = [
    { headerName: 'City', field: 'cityObject', editable: true, 
        cellEditor: 'autoComplete', 
        cellEditorParams: {
          'propertyRendered': 'city',
          'returnObject' : true,
          'rowData': [
            { 'id': 1, 'city': 'Paris', 'country': 'France' },
            { 'id': 2, 'city': 'London', 'country': 'United Kingdom' },
            { 'id': 3, 'city': 'Berlin', 'country': 'Germany' },
            { 'id': 4, 'city': 'Madrid', 'country': 'Spain' },
            { 'id': 5, 'city': 'Rome', 'country': 'Italy' },
            { 'id': 6, 'city': 'Copenhagen', 'country': 'Denmark' },
            { 'id': 7, 'city': 'Brussels', 'country': 'Belgium' },
            { 'id': 8, 'city': 'Amsterdam', 'country': 'The Netherlands' }],
          'columnDefs': [
              {headerName: 'City', field: 'city' },
              {headerName: 'Country', field: 'country' }]
        },
				valueFormatter: (params) => {
					if (params.value) return params.value.city;
					return "";
				},
    },
    { headerName: 'Id', field: 'cityObject.id' },
    { headerName: 'Accommodation', field: 'accommodation', editable: true,
      cellEditor: 'autoComplete',
      cellEditorParams: {
        'propertyRendered' : 'accommodation',
        'rowData': [
            {'accommodation': 'Hotel'}, 
            {'accommodation': 'Rental'}, 
            {'accommodation': 'Friends'}],
        'columnDefs' : [{headerName: 'Accommodation', field: 'accommodation'}]
      },
    },
  ];
    
  rowData = [
      { 'cityObject': {'id': 1, 'city': 'Paris' }, 'accommodation': ''},
      { 'cityObject': {'id': 2, 'city': 'London' }, 'accommodation': ''},
      { 'cityObject': {'id': 2, 'city': 'London' }, 'accommodation': '',},
      { 'cityObject': {'id': 3, 'city': 'Berlin' }, 'accommodation': '',},
      { 'cityObject': {'id': 4, 'city': 'Amsterdam' }, 'accommodation': ''},
      { 'cityObject': {'id': '', 'city': '' }, 'accommodation': ''},
  ]; 

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridApi.sizeColumnsToFit();
  }

  cellEditingStopped(event) {
    this.gridApi.setFocusedCell(event.rowIndex, event.colDef.field);
  }
  
}
