import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CoreModule} from '../core/core.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoaderComponent} from './loader/loader.component';
import {PopupComponent} from './popup/popup.component';
import {AppRoutingModule} from '../app-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  declarations: [
    LoaderComponent,
    PopupComponent
  ],
  providers: [],
  exports: [
    LoaderComponent,
    PopupComponent
  ]
})
export class SharedModule {
}
