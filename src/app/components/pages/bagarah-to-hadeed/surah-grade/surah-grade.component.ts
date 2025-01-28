import { Component, Input } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-surah-grade',
  imports: [MatCardModule, MatDatepickerModule],
  templateUrl: './surah-grade.component.html',
  styleUrl: './surah-grade.component.scss',
})
export class SurahGradeComponent {
  @Input() surah?: string;
  selectedDate?: Date;
  isShowCalendar: boolean = false;
}
