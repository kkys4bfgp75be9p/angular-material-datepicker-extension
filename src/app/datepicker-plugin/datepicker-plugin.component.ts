import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {MatDatepicker} from '@angular/material/datepicker';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import * as moment from 'moment';
import {DateAdapter} from '@angular/material/core';

@Component({
    selector: 'app-datepicker-plugin',
    templateUrl: './datepicker-plugin.component.html',
    styleUrls: ['./datepicker-plugin.component.css']
})
export class DatepickerPluginComponent implements OnInit {
    @Input() referenceDate: FormControl;
    @Input() referenceMaxDate: Date;
    @Input() tooltip: string;
    @Input() disabled = false;
    @Input() label = 'choose a date';
    @Output() dateChange: EventEmitter<string> = new EventEmitter();

    @ViewChild('picker') picker: MatDatepicker<any>;

    parts: FormGroup;
    tomorrowButtonDisabled: boolean;
    private previousValidDate: Date;

    onDateChange(dateValue: string) {
        const currentDate = moment(dateValue, 'DD-MM-YYYY', 'strict');
        if (currentDate.isValid()) {
            this.referenceDate.setValue(currentDate.toDate());
            this.tomorrowButtonDisabled = this._shouldDisableTomorrowButton(currentDate);
            this.dateChange.emit(dateValue);
            this.previousValidDate = currentDate.toDate();
        } else {
            this.referenceDate.setValue(this.previousValidDate);
            this.picker.select(this.previousValidDate);
        }
    }

    constructor(formBuilder: FormBuilder, private adapter: DateAdapter<any>) {
        this.parts = formBuilder.group({
            date: [
                {value: '', disabled: this.disabled},
                [Validators.required, Validators.maxLength(8)]],
        });
    }

    ngOnInit(): void {
        this.adapter.setLocale('en');
        this.adapter.getFirstDayOfWeek = () => 1;
        const defaultDate = this.referenceDate.value;
        this.parts.setValue({date: defaultDate});
        this.tomorrowButtonDisabled = this._shouldDisableTomorrowButton(defaultDate);
        this.previousValidDate = this.referenceDate.value as Date;
    }

    _yesterday() {
        const {date} = this.parts.value;
        const yesterday = moment(date || new Date()).add(-1, 'days');
        this.picker.select(yesterday.toDate());
        this.tomorrowButtonDisabled = this._shouldDisableTomorrowButton(yesterday);
    }

    _today() {
        const today = new Date();
        this.picker.select(today);
        this.tomorrowButtonDisabled = this._shouldDisableTomorrowButton(today);
    }

    _tomorrow() {
        const {date} = this.parts.value;
        const tomorrow = moment(date || new Date()).add(+1, 'days');
        this.picker.select(tomorrow.toDate());
        this.tomorrowButtonDisabled = this._shouldDisableTomorrowButton(tomorrow);
    }

    _shouldDisableTomorrowButton(date: moment.Moment | Date) {
        return moment(date).isSameOrAfter(this.referenceMaxDate, 'day');
    }
}
