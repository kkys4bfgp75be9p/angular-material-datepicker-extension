import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {DemoMaterialModule} from './material-module';

import {DatepickerPluginComponent} from './datepicker-plugin';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatNativeDateModule} from '@angular/material/core';

@NgModule({
    declarations: [
        AppComponent,
        DatepickerPluginComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        DemoMaterialModule,
        MatNativeDateModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
