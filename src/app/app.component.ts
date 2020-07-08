import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    label = 'choose a date';
    referenceDate = new FormControl(new Date());
    referenceDateMaxDate = new Date();
    tooltip = 'just a test datepicker';
}
