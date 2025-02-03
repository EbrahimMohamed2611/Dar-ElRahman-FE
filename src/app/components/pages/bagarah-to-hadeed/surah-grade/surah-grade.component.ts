import { Component, Input } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-surah-grade',
  imports: [MatFormFieldModule, MatInputModule, MatDatepickerModule],
  templateUrl: './surah-grade.component.html',
  styleUrl: './surah-grade.component.scss',
})
export class SurahGradeComponent {
  @Input() surah?: string;
  selectedDate?: Date;
  isShowCalendar: boolean = false;
}
