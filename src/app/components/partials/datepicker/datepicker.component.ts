import { Component, OnInit, Input } from '@angular/core';
import * as _moment from 'moment';
import { DateTimeAdapter, OWL_DATE_TIME_FORMATS, OWL_DATE_TIME_LOCALE } from 'ng-pick-datetime';
import { MomentDateTimeAdapter } from 'ng-pick-datetime-moment';
import { FormGroup } from '@angular/forms';

const moment = (_moment as any).default ? (_moment as any).default : _moment;

export const MY_CUSTOM_FORMATS = {
    parseInput: 'LL LT',
    fullPickerInput: 'LL LT',
    datePickerInput: 'D.M.YYYY',
    timePickerInput: 'LT',
    monthYearLabel: 'D.M.YYYY',
    dateA11yLabel: 'D.M.YYYY',
    monthYearA11yLabel: 'D.M.YYYY',
};

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.css'],
  providers: [
    {provide: DateTimeAdapter, useClass: MomentDateTimeAdapter, deps: [OWL_DATE_TIME_LOCALE]},
    {provide: OWL_DATE_TIME_FORMATS, useValue: MY_CUSTOM_FORMATS},
  ]
})
export class DatepickerComponent implements OnInit {
  @Input() small: boolean = false;
  @Input() placeholder: string = "";
  @Input() gfclasses: string = "";
  @Input() fcName: string = "date";
  @Input() fGroup: FormGroup;

  constructor() { }

  ngOnInit() {
  }

}
