import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AgGridModule } from 'ag-grid-angular';
import { HttpClientModule } from '@angular/common/http'

import { AutoCompleteComponent } from './shared/auto-complete.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule, HttpClientModule,
    AgGridModule.withComponents([AutoCompleteComponent]) ],
  declarations: [ AppComponent, AutoCompleteComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
