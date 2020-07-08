import {async, ComponentFixture, fakeAsync, flush, TestBed} from '@angular/core/testing';

import {DatepickerPluginComponent} from './datepicker-plugin.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatIconModule} from '@angular/material/icon';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {DateAdapter, MatNativeDateModule} from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
import {FormBuilder, FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {By} from '@angular/platform-browser';
import {CommonModule} from '@angular/common';

import {MatDatepicker} from '@angular/material/datepicker';
import * as moment from 'moment';

describe('DatepickerPluginComponent', () => {
    let component: DatepickerPluginComponent;
    let fixture: ComponentFixture<DatepickerPluginComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DatepickerPluginComponent, MatDatepicker],
            imports: [
                CommonModule,
                MatTooltipModule,
                MatIconModule,
                MatDatepickerModule,
                MatFormFieldModule,
                MatNativeDateModule,
                MatInputModule,
                FormsModule,
                ReactiveFormsModule,
                BrowserAnimationsModule
            ],
            providers: [
                // MatDatepickerModule,
                FormBuilder,
                // DateAdapter
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DatepickerPluginComponent);
        component = fixture.componentInstance;
        component.picker = TestBed.createComponent(MatDatepicker).componentInstance;
        component.label = 'choose a date';
        const tenDaysBefore = moment(new Date()).add(-50, 'days');
        component.referenceDate = new FormControl(tenDaysBefore.toDate());
        fixture.detectChanges();
    });

    it('should create component', () => {
        expect(component).toBeTruthy();
    });

    it('should show the correct date', () => {
        const fiftyDaysBefore = moment(new Date()).add(-50, 'days');
        const shortDate = moment(fiftyDaysBefore).format('l');
        expect(getInput().value).toContain(shortDate);
    });

    it('should show label for input', () => {
        expect(fixture.debugElement.query(By.css('label mat-label')).nativeElement.innerText).toContain('choose a date');
    });

    it('should show enabled buttons', () => {
        expect(fixture.debugElement.query(By.css('[aria-label="button for tomorrow"]')).nativeElement.disabled).toBeFalsy();
        expect(fixture.debugElement.query(By.css('[aria-label="button for today"]')).nativeElement.disabled).toBeFalsy();
        expect(fixture.debugElement.query(By.css('[aria-label="button for yesterday"]')).nativeElement.disabled).toBeFalsy();
    });

    it('should call select method from picker!', () => {
        spyOn(component.picker, 'select').and.callThrough();
        const yesterdayButton = fixture.debugElement.query(By.css('[aria-label="button for yesterday"]'));
        yesterdayButton.nativeElement.click();
        fixture.detectChanges();
        expect(component.picker.select).toHaveBeenCalled();
    });

    it('should show today in the input field', () => {
        const formattedDate = moment(new Date()).format('l');
        const todayButton = getButton('button for today');
        todayButton.click();
        fixture.detectChanges();
        expect(getInput().value).toContain(formattedDate);
    });

    it('should show tomorrow in the input field', () => {
        const fourtyNineDaysBefore = moment(new Date()).add(-49, 'days');
        const selectReturning = component.picker.select.bind(component.picker);
        spyOn(component.picker, 'select').and.callFake(() => {
            return selectReturning(fourtyNineDaysBefore.toDate());
        });
        const tomorrowButton = getButton('button for tomorrow');
        expect(tomorrowButton.disabled).toBeFalsy();
        tomorrowButton.click();
        fixture.detectChanges();
        expect(component.picker.select).toHaveBeenCalled();
        const formattedDate = moment(fourtyNineDaysBefore).format('l');
        expect(getInput().value).toContain(formattedDate);
    });

    it('should show yesterday in the input field', () => {
        const fiftyoneDaysBefore = moment(new Date()).add(-51, 'days');
        const selectReturning = component.picker.select.bind(component.picker);
        spyOn(component.picker, 'select').and.callFake(() => {
            return selectReturning(fiftyoneDaysBefore.toDate());
        });
        const yesterdayButton = getButton('button for yesterday');
        expect(yesterdayButton.disabled).toBeFalsy();
        yesterdayButton.click();
        fixture.detectChanges();
        expect(component.picker.select).toHaveBeenCalled();
        const formattedDate = moment(fiftyoneDaysBefore).format('l');
        expect(getInput().value).toContain(formattedDate);
    });

    it('should show disabled tomorrow button', () => {
        const todayButton = getButton('button for today');
        todayButton.click();
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css('[aria-label="button for tomorrow"]')).nativeElement.disabled).toBeTruthy();
    });

    const getButton = (ariaLabel: string) => {
        return fixture.debugElement.query(By.css(`[aria-label="${ariaLabel}"]`)).nativeElement;
    };

    const getInput = () => {
        return fixture.debugElement.query(By.css('input')).nativeElement;
    };

});

